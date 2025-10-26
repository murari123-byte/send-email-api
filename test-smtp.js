require('dotenv').config();
const nodemailer = require('nodemailer');

async function testSMTP() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // your App Password
      },
    });

    // Verify connection
    await transporter.verify();
    console.log('SMTP login successful! App Password is correct.');
  } catch (error) {
    console.error('SMTP login failed:', error.message);
  }
}

testSMTP();
