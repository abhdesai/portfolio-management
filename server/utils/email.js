const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { appDebug, techDebug } = require('./debug');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

appDebug('Email service configuration:');
appDebug('SENDGRID_API_KEY:', SENDGRID_API_KEY ? 'SET' : 'NOT SET');
appDebug('SENDGRID_FROM_EMAIL:', SENDGRID_FROM_EMAIL || 'NOT SET');
appDebug('GMAIL_USER:', GMAIL_USER ? 'SET' : 'NOT SET');
appDebug('GMAIL_PASS:', GMAIL_PASS ? 'SET' : 'NOT SET');

/**
 * Send an email using SendGrid or Gmail fallback
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} [html] - Optional HTML content
 * @returns {Promise<void>}
 */
async function sendEmail({ to, subject, text, html }) {
  // Try SendGrid if configured
  if (SENDGRID_API_KEY && SENDGRID_FROM_EMAIL) {
    try {
      sgMail.setApiKey(SENDGRID_API_KEY);
      const msg = {
        to,
        from: SENDGRID_FROM_EMAIL,
        subject,
        text,
        html: html || text,
      };
      await sgMail.send(msg);
      appDebug(`Email sent to ${to}: ${subject} (via SendGrid)`);
      return;
    } catch (error) {
      techDebug('SendGrid error:', error.response?.body || error.message);
      // Fallback to Gmail if configured
      if (GMAIL_USER && GMAIL_PASS) {
        try {
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: GMAIL_USER,
              pass: GMAIL_PASS
            }
          });
          await transporter.sendMail({
            from: GMAIL_USER,
            to,
            subject,
            text,
            html: html || text
          });
          appDebug(`Email sent to ${to}: ${subject} (via Gmail fallback)`);
          return;
        } catch (gmailError) {
          techDebug('Gmail fallback error:', gmailError.message);
        }
      } else {
        techDebug('Gmail fallback not configured. Email not sent.');
      }
    }
  }

  // If no email service is configured, log the email content
  techDebug('No email service configured. Email content:');
  techDebug('To:', to);
  techDebug('Subject:', subject);
  techDebug('Text:', text);
  techDebug('HTML:', html);
  techDebug('--- Email would be sent here ---');
  appDebug(`Email sent to ${to}: ${subject} (logged only)`);
}

module.exports = { sendEmail }; 