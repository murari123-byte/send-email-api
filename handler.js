'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports.sendEmail = async (event) => {
  try {
    const { receiver_email, subject, body_text } = JSON.parse(event.body);

    if (!receiver_email || !subject || !body_text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    // Gmail transfer using App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({   // Send the email
      from: process.env.GMAIL_USER,
      to: receiver_email,
      subject: subject,
      text: body_text,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Email sent successfully to ${receiver_email}` }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
    };
  }
};
