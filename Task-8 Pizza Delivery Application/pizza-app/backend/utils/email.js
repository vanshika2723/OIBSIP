const nodemailer = require("nodemailer");

const sendEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "YOUR_GMAIL@gmail.com",
        pass: "YOUR_APP_PASSWORD",
      },
    });

    const verifyLink = `http://localhost:5000/api/verify/${token}`; // ✅ backend route

    await transporter.sendMail({
      from: '"Pizza App 🍕" <YOUR_GMAIL@gmail.com>',
      to: email,
      subject: "Verify Your Email",
      html: `
        <h2>Email Verification</h2>
        <p>Click below to verify your account:</p>
        <a href="${verifyLink}">${verifyLink}</a>
      `,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email error:", error);
  }
};

module.exports = sendEmail;