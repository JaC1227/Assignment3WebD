const mailgun = require("mailgun-js");
require('dotenv').config();

exports.handler = async (event) => {
  try {
    const { name, phone, email, subject, message } = JSON.parse(event.body);

    const mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });

    const data = {
      from: `postmaster@sandbox3cda22694a9d47afb5ef2fda3a82243d.mailgun.org`,
      to: "jaedynchinn@icloud.com", 
      subject: formData.subject,
      text: `Message from: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`,
    };
    

    await mg.messages().send(emailData);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message" }),
    };
  }
};
