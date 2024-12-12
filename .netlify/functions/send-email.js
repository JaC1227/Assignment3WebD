const formData = require('form-data');
const Mailgun = require('mailgun.js');
require('dotenv').config();

// Initialize Mailgun client with API key
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

exports.handler = async (event) => {
  console.log('Mailgun API Key:', process.env.MAILGUN_API_KEY);
  console.log('Request Body:', event.body);

  // Decode and parse the body
  const decodedBody = Buffer.from(event.body, 'base64').toString('utf8');
  const parsedBody = querystring.parse(decodedBody);
  console.log('Parsed Body:', parsedBody);
  
  const { name, phone, email, subject, message } = parsedBody;

  try {

    // Create email data
    const data = {
      from: "User <mailgun@sandbox3cda22694a9d47afb5ef2fda3a82243d.mailgun.org>",
      to: ["jaedynchinn@icloud.com"], 
      subject: subject,
      text: `Message from: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      html: `<h1>Message from: ${name}</h1><p>${message}</p>`,
    };
    console.log('Email Data:', data);

    // Send the email using Mailgun's client
    const response = await mg.messages.create(
      'sandbox3cda22694a9d47afb5ef2fda3a82243d.mailgun.org', // sandbox domain
      data
    );

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: response }),
    };
  } catch (error) {
    // Return error if the request fails
    console.error("Error sending email:", error); // Log the full error for debugging
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message", details: error.message }),
    };
  }
};
