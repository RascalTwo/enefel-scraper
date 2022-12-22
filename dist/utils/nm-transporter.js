import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
    name: "no-reply@enefel.com",
    host: process.env.EMAIL_SMTP_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    tls: {
        rejectUnauthorized: false,
    },
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});
