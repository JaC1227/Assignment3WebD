const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
require('dotenv').config();

exports.handler = async (event) => {
  try {
    const { name, phone, email, subject, message } = JSON.parse(event.body);
    
    const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});
    
    const data = {
      from: "contact form <mailgun@sandbox3cda22694a9d47afb5ef2fda3a82243d.mailgun.org>",
      to: ["jaedynchinn@icloud.com"],
      subject: subject,
      text: `Message from: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      html: `<h1>Message from: ${name}</h1><p>${message}</p>`
    };
    
    const response = await mg.messages.create('sandbox3cda22694a9d47afb5ef2fda3a82243d.mailgun.org', data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: response }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message", details: error }),
    };
  }
};
