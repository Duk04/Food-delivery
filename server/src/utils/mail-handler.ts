import { configDotenv } from "dotenv";
import { createTransport } from "nodemailer";

configDotenv();

const { EMAIL_PASSWORD, EMAIL_USER } = process.env;

const transport = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

export const sendVerificationLink = async (baseURL: string, email: string) => {
  await transport.sendMail({
    text: "User Verification Link",
    to: email,
    from: EMAIL_USER,
    html: `
    <h1>Hello</h1>
    <a href="${baseURL}">hihsihd</a>`,
  });
};
