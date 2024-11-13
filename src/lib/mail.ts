import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "oghenefejiro232@gmail.com",
    pass: "46eee27618e84789d9c458bbd81380c5-d010bdaf-2d68668a",
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env
    .NEXT_PUBLIC_SITE_URL!}/auth/new-verification?token=${token}`;
  const mailOptions: Mail.Options = {
    from: "Travel Experts",
    to: email,
    subject: "Email Confirmation",
    html: `<p>Hello world</p>`,
    // html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info.response);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
