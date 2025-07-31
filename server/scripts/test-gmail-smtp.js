const nodemailer = require('nodemailer');
const readline = require('readline');
require('dotenv').config();
const { appDebug, techDebug, appError, techError, appInfo, techInfo } = require('../utils/debug');

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => rl.question(question, (ans) => {
    rl.close();
    resolve(ans);
  }));
}

async function main() {
  let GMAIL_USER = process.env.GMAIL_USER;
  let GMAIL_PASS = process.env.GMAIL_PASS;

  if (!GMAIL_USER) {
    GMAIL_USER = await ask('Enter your Gmail address: ');
  }
  if (!GMAIL_PASS) {
    GMAIL_PASS = await ask('Enter your Gmail password (input hidden): ');
  }

  const to = GMAIL_USER;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });

  try {
    let info = await transporter.sendMail({
      from: GMAIL_USER,
      to,
      subject: 'Gmail SMTP Test',
      text: 'This is a test email sent using Gmail SMTP and nodemailer.'
    });
    appInfo('✅ Email sent successfully:', info.response);
  } catch (error) {
    appError('❌ Failed to send email:', error.message);
  }
}

main(); 