

const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const prisma = require('../utils/database');
const bcrypt = require('bcryptjs'); // Added for password hashing
const { sendEmail } = require('../utils/email');
const { appDebug, techDebug, appError, techError, appInfo, techInfo } = require('../utils/debug');
const { validateEmail, validatePhone, validateUserProfile } = require('../middleware/validation');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `avatar_${req.user.userId}_${Date.now()}${ext}`);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/svg+xml') {
      return cb(new Error('Only PNG and SVG files are allowed.'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Validation functions moved to middleware/validation.js

// Middleware to get user from JWT (assumes Bearer token)
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Admin user management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 */
router.get('/', authMiddleware, async (req, res) => {
  // Check if user is admin
  const currentUser = await prisma.user.findUnique({ where: { id: req.user.userId } });
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  const users = await prisma.user.findMany({ 
    select: { 
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      street: true,
      city: true,
      state: true,
      zipCode: true,
      country: true,
      avatarUrl: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true
    } 
  });
  res.json(users);
});

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Update your user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               country:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.put('/me', authMiddleware, upload.single('avatar'), async (req, res) => {
  try {
    appDebug('Profile update request received:', {
      body: req.body,
      file: req.file,
      userId: req.user.userId
    });

    const { firstName, lastName, email, phone, street, city, state, zipCode, country } = req.body;
    
      // Validation
  if (email && !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }
  if (!phone || !phone.trim()) {
    return res.status(400).json({ message: 'Phone number is required.' });
  }
  if (!validatePhone(phone)) {
    return res.status(400).json({ message: 'Invalid phone number format.' });
  }

    // Handle avatar upload
    let avatarUrl;
    if (req.file) {
      avatarUrl = `/uploads/${req.file.filename}`;
      appInfo('Avatar uploaded:', avatarUrl);
    }

    // Prepare update data
    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (street !== undefined) updateData.street = street;
    if (city !== undefined) updateData.city = city;
    if (state !== undefined) updateData.state = state;
    if (zipCode !== undefined) updateData.zipCode = zipCode;
    if (country !== undefined) updateData.country = country;
    if (avatarUrl) updateData.avatarUrl = avatarUrl;

    appDebug('Update data:', updateData);

    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: updateData,
    });

    appInfo('User updated successfully:', user.id);

    // Send profile update confirmation email
    const profileUpdateEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1976d2;">Profile Updated Successfully</h2>
        <p>Hello ${user.firstName} ${user.lastName},</p>
        <p>Your profile has been successfully updated.</p>
        <p><strong>Updated at:</strong> ${new Date().toLocaleString()}</p>
        <p>If you did not make this change, please contact support immediately.</p>
        <p>Best regards,<br>Portfolio Management Team</p>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: 'Profile Updated - Portfolio Management',
      text: `Hello ${user.firstName} ${user.lastName}, your profile has been successfully updated.`,
      html: profileUpdateEmailHtml
    });

    res.json({
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
    });
  } catch (err) {
    appError('Error updating user profile:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               country:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: User not found
 */
router.put('/:id', authMiddleware, async (req, res) => {
  // Check if user is admin
  const currentUser = await prisma.user.findUnique({ where: { id: req.user.userId } });
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  const userId = Number(req.params.id);

  // Prevent admin from editing themselves
  if (userId === req.user.userId) {
    return res.status(400).json({ message: 'Cannot edit your own account from this interface' });
  }

  const { firstName, lastName, email, phone, street, city, state, zipCode, country, role } = req.body;

  // Validation
  if (email && !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!phone || !phone.trim()) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  if (!validatePhone(phone)) {
    return res.status(400).json({ message: 'Invalid phone number format' });
  }

  if (role && !['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    // Check if user exists
    const userToUpdate = await prisma.user.findUnique({ where: { id: userId } });
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Email uniqueness check removed - emails can be shared between users

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: firstName || userToUpdate.firstName,
        lastName: lastName || userToUpdate.lastName,
        email: email || userToUpdate.email,
        phone: phone !== undefined ? phone : userToUpdate.phone,
        street: street !== undefined ? street : userToUpdate.street,
        city: city !== undefined ? city : userToUpdate.city,
        state: state !== undefined ? state : userToUpdate.state,
        zipCode: zipCode !== undefined ? zipCode : userToUpdate.zipCode,
        country: country !== undefined ? country : userToUpdate.country,
        role: role || userToUpdate.role
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        street: true,
        city: true,
        state: true,
        zipCode: true,
        country: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Send profile update notification email
    const updateEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1976d2;">Account Information Updated</h2>
        <p>Hello ${updatedUser.firstName} ${updatedUser.lastName},</p>
        <p>Your account information has been updated by an administrator.</p>
        <p><strong>Updated by:</strong> Admin</p>
        <p><strong>Updated at:</strong> ${new Date().toLocaleString()}</p>
        <p>If you did not request this change, please contact support immediately.</p>
        <p>Best regards,<br>Portfolio Management Team</p>
      </div>
    `;

    await sendEmail({
      to: updatedUser.email,
      subject: 'Account Information Updated - Portfolio Management',
      text: `Hello ${updatedUser.firstName} ${updatedUser.lastName}, your account information has been updated by an administrator.`,
      html: updateEmailHtml
    });

    res.json(updatedUser);
  } catch (err) {
    appError('Error updating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 */
router.post('/', authMiddleware, async (req, res) => {
  // Check if user is admin
  const currentUser = await prisma.user.findUnique({ where: { id: req.user.userId } });
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  const { username, firstName, lastName, email, phone, password, role } = req.body;

  // Validation
  if (!username || !firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!phone || !phone.trim()) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  if (!validatePhone(phone)) {
    return res.status(400).json({ message: 'Invalid phone number format' });
  }

  // Validate password requirements
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
  }
  if (!/[a-z]/.test(password)) {
    return res.status(400).json({ message: 'Password must contain at least one lowercase letter' });
  }
  if (!/\d/.test(password)) {
    return res.status(400).json({ message: 'Password must contain at least one number' });
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return res.status(400).json({ message: 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)' });
  }

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    // Check if username already exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Email uniqueness check removed - emails can be shared between users

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        email,
        phone: phone || '',
        password: hashedPassword,
        role,
        emailVerified: true // Admin-created users are auto-verified
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        street: true,
        city: true,
        state: true,
        zipCode: true,
        country: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Send welcome email
    const welcomeEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1976d2;">Welcome to Portfolio Management!</h2>
        <p>Hello ${user.firstName} ${user.lastName},</p>
        <p>A user account has been created for you by your administrator.</p>
        <ul>
          <li><strong>Username:</strong> ${user.username}</li>
          <li><strong>Email:</strong> ${user.email}</li>
          <li><strong>Role:</strong> ${user.role}</li>
        </ul>
        <p><strong>Important:</strong> Please ask your administrator for your password.</p>
        <p>You can now log in to your account and start managing your portfolios.</p>
        <p>Best regards,<br>Portfolio Management Team</p>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: 'Welcome to Portfolio Management - Account Created',
      text: `Hello ${user.firstName} ${user.lastName}, a user account has been created for you. Please ask your administrator for your password. Username: ${user.username}, Role: ${user.role}`,
      html: welcomeEmailHtml
    });

    res.status(201).json(user);
  } catch (err) {
    appError('Error creating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  // Check if user is admin
  const currentUser = await prisma.user.findUnique({ where: { id: req.user.userId } });
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  const userId = Number(req.params.id);

  // Prevent admin from deleting themselves
  if (userId === req.user.userId) {
    return res.status(400).json({ message: 'Cannot delete your own account' });
  }

  try {
    // Check if user exists
    const userToDelete = await prisma.user.findUnique({ where: { id: userId } });
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send account deletion notification email
    const deletionEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d32f2f;">Account Deleted</h2>
        <p>Hello ${userToDelete.firstName} ${userToDelete.lastName},</p>
        <p>Your account has been permanently deleted from the Portfolio Management system.</p>
        <p><strong>Deleted by:</strong> Administrator</p>
        <p><strong>Deleted at:</strong> ${new Date().toLocaleString()}</p>
        <p>All your data, including portfolios and transactions, has been permanently removed.</p>
        <p>If you believe this was done in error, please contact support immediately.</p>
        <p>Best regards,<br>Portfolio Management Team</p>
      </div>
    `;

    await sendEmail({
      to: userToDelete.email,
      subject: 'Account Deleted - Portfolio Management',
      text: `Hello ${userToDelete.firstName} ${userToDelete.lastName}, your account has been permanently deleted from the Portfolio Management system.`,
      html: deletionEmailHtml
    });

    // Allow deleting any user except the current user (self-deletion prevention is already handled above)
    // Delete all transactions and portfolios for the user before deleting the user
    const userPortfolios = await prisma.portfolio.findMany({ where: { userId } });
    const portfolioIds = userPortfolios.map(p => p.id);
    if (portfolioIds.length > 0) {
      await prisma.transaction.deleteMany({ where: { portfolioId: { in: portfolioIds } } });
      await prisma.portfolio.deleteMany({ where: { id: { in: portfolioIds } } });
    }
    await prisma.user.delete({ where: { id: userId } });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    appError('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;