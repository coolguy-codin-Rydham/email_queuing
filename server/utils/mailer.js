import nodemailer from "nodemailer";
import { config } from "dotenv";
config();
// Create the transport object for sending emails
export let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.NODE_EMAIL,
        pass: process.env.NODE_PASS,
    },
});