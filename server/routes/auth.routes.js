const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const prisma = require('../utils/database');
const { sendEmail } = require('../utils/email');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const { appDebug, techDebug, appError, techError, appInfo, techInfo } = require('../utils/debug');
const { validateRegistration } = require('../middleware/validation');
const { registrationLimiter, passwordResetLimiter, authLimiter } = require('../middleware/rateLimit');

// Multer storage for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/avatars'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `avatar_${req.user.userId}_${Date.now()}${ext}`);
  }
});
const uploadAvatar = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Ensure uploads/avatars directory exists
const fs = require('fs');
const avatarsDir = path.join(__dirname, '../uploads/avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Rate limiting moved to middleware/rateLimit.js

// Validation functions moved to middleware/validation.js

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe123
 *               password:
 *                 type: string
 *                 example: mySecretPassword
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user already exists
 */
router.post('/signup', registrationLimiter, validateRegistration, uploadAvatar.single('avatar'), async (req, res) => {
  // Use req.body for text fields, req.file for avatar
  const { username, firstName, lastName, email, phone, street, city, state, zipCode, country, password } = req.body;
  
  // Sanitize additional fields not handled by validation middleware
  const sanitizedPhone = phone ? phone.trim() : null;
  const sanitizedStreet = street ? street.trim() : null;
  const sanitizedCity = city ? city.trim() : null;
  const sanitizedState = state ? state.trim() : null;
  const sanitizedZipCode = zipCode ? zipCode.trim() : null;
  const sanitizedCountry = country ? country.trim() : null;
  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate secure email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenHash = crypto.createHash('sha256').update(verificationToken).digest('hex');
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    
    // Handle avatar file
    let avatarUrl = null;
    if (req.file) {
      avatarUrl = `/uploads/avatars/${req.file.filename}`;
    }
    
    // Note: Unverified accounts will expire after 24 hours
    // You can implement account cleanup by running a scheduled job
    // to delete unverified accounts older than 24 hours
    
    const newUser = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        email,
        phone: sanitizedPhone,
        street: sanitizedStreet,
        city: sanitizedCity,
        state: sanitizedState,
        zipCode: sanitizedZipCode,
        country: sanitizedCountry,
        password: hashedPassword,
        emailVerified: false,
        emailVerificationToken: verificationTokenHash,
        emailVerificationExpiry: verificationExpiry,
        avatarUrl: avatarUrl
      }
    });

    // Compose verification link with only the token
    const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:6060'}/verify-email?token=${verificationToken}`;

    // Compose verification email HTML and text
    const verificationEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1976d2;">Welcome to Portfolio Management!</h2>
        <p>Hello ${firstName} ${lastName},</p>
        <p>Thank you for registering! To complete your registration, please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" style="background-color: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Verify Email Address</a>
        </div>
        <p><strong>Or copy and paste this link in your browser:</strong></p>
        <p style="word-break: break-all; color: #666;">${verificationLink}</p>
        <ul>
          <li>This verification link will expire in 24 hours</li>
          <li>If you didn't create this account, please ignore this email</li>
          <li>After verification, you can log in to your account</li>
        </ul>
        <p>Best regards,<br>Portfolio Management Team</p>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: 'Verify Your Email - Portfolio Management Registration',
      text: `Hello ${firstName} ${lastName}, please verify your email by visiting: ${verificationLink}`,
      html: verificationEmailHtml
    });

    res.status(201).json({ 
      message: 'Registration successful! Please check your email to verify your account before logging in.',
      requiresVerification: true,
      avatarUrl: avatarUrl
    });
  } catch (err) {
    appError('Signup error:', err);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 */
router.post('/forgot-password', passwordResetLimiter, async (req, res) => {
  const { username, email } = req.body;
  
  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required' });
  }

  // Sanitize inputs
  const sanitizedUsername = sanitizeInput(username);
  const sanitizedEmail = sanitizeInput(email);
  
  if (!sanitizedUsername || !sanitizedEmail) {
    return res.status(400).json({ message: 'Invalid input provided' });
  }

  try {
    const user = await prisma.user.findFirst({ where: { username: sanitizedUsername, email: sanitizedEmail } });
    
    if (user) {
      // Generate a secure random token
      const resetToken = crypto.randomBytes(32).toString('hex');
      // Hash the token for storage
      const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

      // Store hashed token in database
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: resetTokenHash,
          resetTokenExpiry: resetTokenExpiry
        }
      });

      // Send password reset email with only the token in the link
      appInfo(`[EMAIL] Sending password reset email to ${user.email} for username: ${user.username}`);
      
      const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:6060'}/reset-password?token=${resetToken}`;
      
              appDebug('=== PASSWORD RESET LINK ===');
        appDebug('Reset link:', resetLink);
        appDebug('===========================');
      
      const resetEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1976d2;">Password Reset Request</h2>
          <p>Hello ${user.firstName} ${user.lastName},</p>
          <p>You have requested to reset your password for your Portfolio Management account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p><strong>Or copy and paste this link in your browser:</strong></p>
          <p style="word-break: break-all; color: #666;">
            ${resetLink}
          </p>
          <p>This reset link will expire in 1 hour.</p>
          <p>If you did not request this password reset, please ignore this email.</p>
          <p>Best regards,<br>Portfolio Management Team</p>
        </div>
      `;

      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request - Portfolio Management',
        text: `Hello ${user.firstName} ${user.lastName}, you have requested to reset your password. Click this link to reset: ${resetLink}`,
        html: resetEmailHtml
      });
    }

    // Always return success to prevent user enumeration
    // Don't reveal whether the user exists or not
    res.json({ message: 'If a matching username and email combination is found, a password reset email has been sent' });
  } catch (err) {
    appError('Password reset error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid token or expired
 */
router.post('/reset-password', passwordResetLimiter, async (req, res) => {
  const { token, newPassword } = req.body;
  
  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }

  // Sanitize inputs
  const sanitizedToken = sanitizeInput(token);
  const sanitizedPassword = sanitizeInput(newPassword);
  
  if (!sanitizedToken || !sanitizedPassword) {
    return res.status(400).json({ message: 'Invalid input provided' });
  }

  try {
    // Hash the received token
    const tokenHash = crypto.createHash('sha256').update(sanitizedToken).digest('hex');
    // Find user by hashed token
    const user = await prisma.user.findFirst({ where: { resetToken: tokenHash } });
    
    if (!user) {
      return res.status(404).json({ message: 'Invalid reset token' });
    }

    // Verify token expiry
    const notExpired = user.resetTokenExpiry && user.resetTokenExpiry > new Date();
    if (!notExpired) {
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(sanitizedPassword, 10);

    // Check if new password is same as current password
    const isSamePassword = await bcrypt.compare(sanitizedPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: 'New password must be different from current password' });
    }

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    // Send password change confirmation email
    appInfo(`[EMAIL] Sending password change confirmation email to ${user.email}`);
    const passwordChangeEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1976d2;">Password Changed Successfully</h2>
        <p>Hello ${user.firstName} ${user.lastName},</p>
        <p>Your password has been successfully changed.</p>
        <p><strong>Changed at:</strong> ${new Date().toLocaleString()}</p>
        <p>If you did not make this change, please contact support immediately.</p>
        <p>Best regards,<br>Portfolio Management Team</p>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: 'Password Changed - Portfolio Management',
      text: `Hello ${user.firstName} ${user.lastName}, your password has been successfully changed.`,
      html: passwordChangeEmailHtml
    });

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    appError('Password reset error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    
    // Check if email is verified
    if (!user.emailVerified) {
      return res.status(401).json({ 
        message: 'Please verify your email address before logging in. Check your inbox for the verification link.',
        requiresVerification: true
      });
    }
    
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token, user: {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      street: user.street,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      country: user.country,
      avatarUrl: user.avatarUrl,
      role: user.role
    }});
  } catch (err) {
    appError('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify email address with token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */
router.post('/verify-email', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Verification token is required' });
  }
  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const user = await prisma.user.findFirst({
      where: { emailVerificationToken: tokenHash },
      select: {
        id: true,
        username: true,
        email: true,
        emailVerified: true,
        emailVerificationToken: true,
        emailVerificationExpiry: true,
        firstName: true,
        lastName: true
      }
    });
    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired verification token' });
    }
    if (user.emailVerified) {
      return res.status(200).json({ message: 'Email is already verified', alreadyVerified: true });
    }
    if (!user.emailVerificationToken || !user.emailVerificationExpiry || user.emailVerificationExpiry < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpiry: null
      }
    });
    await sendEmail({
      to: user.email,
      subject: 'Welcome to Portfolio Management - Email Verified!',
      text: `Welcome ${user.firstName} ${user.lastName}! Your email has been verified and your account is now active.`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2 style="color: #1976d2;">Welcome to Portfolio Management!</h2><p>Hello ${user.firstName} ${user.lastName},</p><p>Your email has been successfully verified! Your account is now active and you can log in to start managing your portfolios.</p><p><strong>Account Details:</strong></p><ul><li><strong>Username:</strong> ${user.username}</li><li><strong>Email:</strong> ${user.email}</li><li><strong>Role:</strong> User</li></ul><p>You can now log in to your account and start managing your portfolios.</p><p>Best regards,<br>Portfolio Management Team</p></div>`
    });
    res.json({ message: 'Email verified successfully! You can now log in to your account.', verified: true });
  } catch (err) {
    appError('Email verification error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change password for authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Current password for verification
 *               newPassword:
 *                 type: string
 *                 description: New password to set
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid current password or validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current password and new password are required' });
  }

  // Validate new password
  if (newPassword.length < 8) {
    return res.status(400).json({ message: 'New password must be at least 8 characters long' });
  }
  if (!/[A-Z]/.test(newPassword)) {
    return res.status(400).json({ message: 'New password must contain at least one uppercase letter' });
  }
  if (!/[a-z]/.test(newPassword)) {
    return res.status(400).json({ message: 'New password must contain at least one lowercase letter' });
  }
  if (!/\d/.test(newPassword)) {
    return res.status(400).json({ message: 'New password must contain at least one number' });
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
    return res.status(400).json({ message: 'New password must contain at least one special character (!@#$%^&*(),.?":{}|<>)' });
  }

  // Get user from JWT token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword }
    });

    // Send password change confirmation email
    appInfo(`[EMAIL] Sending password change confirmation email to ${user.email}`);
    const passwordChangeEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1976d2;">Password Changed Successfully</h2>
        <p>Hello ${user.firstName} ${user.lastName},</p>
        <p>Your password has been successfully changed.</p>
        <p><strong>Changed at:</strong> ${new Date().toLocaleString()}</p>
        <p>If you did not make this change, please contact support immediately.</p>
        <p>Best regards,<br>Portfolio Management Team</p>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: 'Password Changed - Portfolio Management',
      text: `Hello ${user.firstName} ${user.lastName}, your password has been successfully changed.`,
      html: passwordChangeEmailHtml
    });

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    appError('Change password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
