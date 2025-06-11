const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "m.mustafa.iti@gmail.com",
      pass:"notf pgqw vgna cdit"
    },
  });

await transporter.sendMail({
  from: `"E-Commerce Support" <m.mustafa.iti@gmail.com>`,
  to,
  subject,
  text,
});
}

module.exports = sendEmail;
