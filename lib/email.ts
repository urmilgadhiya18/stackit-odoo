import nodemailer from "nodemailer";
import process from "node:process";

/**
 * Creates a nodemailer transporter using Gmail
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Sends an email using nodemailer
 * @param options Email sending options
 * @returns Promise resolved when email is sent
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = `"Inslyt" <${process.env.EMAIL_USER}>`,
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}): Promise<void> {
  const transporter = createTransporter();

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${Array.isArray(to) ? to.join(', ') : to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

/**
 * Sends OTP email for password reset
 * @param email Recipient email
 * @param otp One-time password
 */
export async function sendOTPEmail(email: string, otp: string): Promise<void> {
  await sendEmail({
    to: email,
    subject: "Password Reset OTP",
    html: `
      <h2>Password Reset Request</h2>
      <p>Your One-Time Password (OTP) for resetting your password is:</p>
      <h3>${otp}</h3>
      <p>This OTP is valid for 5 minutes. Please use it to reset your password.</p>
      <p>If you did not request this, please ignore this email.</p>
      <p>Best regards,<br>Inslyt Team</p>
    `,
  });
}
