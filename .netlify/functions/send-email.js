const formData = require('form-data');
const Mailgun = require('mailgun.js');
require('dotenv').config();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

exports.handler = async (event) => {
  try {
    console.log("Request body:", event.body); // Log the entire request body for debugging

    const form = new URLSearchParams(event.body); // Parse the form data from the request body
    const name = form.get('name');
    const phone = form.get('phone');
    const email = form.get('email');
    const subject = form.get('subject');
    const message = form.get('message');

    console.log("Form Data:", { name, phone, email, subject, message }); // Log the extracted form data

    // Prepare email data
    const data = {
      from: "User <mailgun@sandbox3cda22694a9d47afb5ef2fda3a82243d.mailgun.org>",
      to: ["jaedynchinn@icloud.com"], 
      subject: subject,
      text: `Message from: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      html: `<h1>Message from: ${name}</h1><p>${message}</p>`,
    };

    // Send the email
    const response = await mg.messages.create(
      'sandbox3cda22694a9d47afb5ef2fda3a82243d.mailgun.org',
      data
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: response }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message", details: error.message }),
    };
  }
};
