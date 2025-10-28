// emailConfig.js
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.EMAIL_API);

/**
 * Send an email using SendGrid
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - HTML content
 */
const sendEmail = async (to, subject, html) => {
  try {
    await sgMail.send({
      to,
      from: "team.quantumgroup@gmail.com",
      subject,
      html,
    });
    // console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    if (error.response) console.error("Response body:", error.response.body);
    throw error;
  }
};

module.exports = sendEmail;
