const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async (event) => {
  try {
    // Parse the incoming form data
    const { name, phone, email, subject, message } = JSON.parse(event.body);

    // Create the transporter using Mailgun's SMTP server
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      auth: {
        user: process.env.MAILGUN_DOMAIN,
        pass: process.env.MAILGUN_API_KEY,
      },
    });

    // Email options
    const mailOptions = {
      from: `postmaster@sandbox3cda22694a9d47afb5ef2fda3a82243d.mailgun.org`, // Your Mailgun domain's "postmaster" email
      to: 'jaedynchinn@icloud.com', // Recipient email
      subject: subject, // Form subject
      text: `Message from: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`, // Body of the email
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message" }),
    };
  }
};
