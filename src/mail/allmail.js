import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


const BRAND_NAME = "Janta Paints & Hardware";
const BRAND_PURPLE = "#7C3AED";
const DARK_PURPLE = "#5B21B6";
const LIGHT_PURPLE = "#F5F3FF";
const BORDER_PURPLE = "#DDD6FE";

// Escape dynamic values before inserting them into HTML.
const escapeHtml = (value = "") =>
    String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[char]);

// Reusable branded email template.
const getEmailTemplate = ({
    name,
    title,
    message,
    otp,
    buttonText,
    footerMessage,
}) => {
    const safeName = escapeHtml(name || "Customer");
    const safeTitle = escapeHtml(title);
    const safeMessage = escapeHtml(message);
    const safeFooter = escapeHtml(
        footerMessage || "Thank you for choosing Janta Paints & Hardware."
    );
    const safeOtp = otp == null ? "" : escapeHtml(otp);

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${safeTitle}</title>
</head>
<body style="margin:0;padding:0;background:#F5F3FF;
    font-family:Arial,Helvetica,sans-serif;color:#334155;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
        border="0" style="background:#F5F3FF;padding:30px 12px;">
        <tr>
            <td align="center">

                <table role="presentation" width="100%" cellspacing="0"
                    cellpadding="0" border="0"
                    style="max-width:600px;background:#FFFFFF;
                    border-radius:18px;overflow:hidden;
                    border:1px solid #DDD6FE;">

                    <!-- Purple Gradient Brand Header -->
                    <tr>
                        <td align="center"
                            style="padding:35px 20px;
                            background-color:#7C3AED;
                            background-image:linear-gradient(
                                135deg,#6D28D9 0%,#7C3AED 50%,#A78BFA 100%
                            );">

                            <div style="display:inline-block;width:66px;
                                height:66px;line-height:66px;
                                border-radius:18px;background:#FFFFFF;
                                color:#7C3AED;font-size:23px;
                                font-weight:bold;text-align:center;
                                border:2px solid #EDE9FE;">
                                JPH
                            </div>

                            <h1 style="margin:17px 0 7px;
                                color:#FFFFFF;font-size:25px;
                                line-height:1.3;">
                                Janta Paints &amp; Hardware
                            </h1>

                            <p style="margin:0;color:#F3E8FF;
                                font-size:12px;letter-spacing:2px;">
                                COLOURS &bull; QUALITY &bull; TRUST
                            </p>
                        </td>
                    </tr>

                    <!-- Main Email Content -->
                    <tr>
                        <td style="padding:32px 28px 26px;">

                            <p style="margin:0 0 12px;font-size:15px;
                                color:#475569;">
                                Hello <strong style="color:#5B21B6;">
                                    ${safeName}
                                </strong>,
                            </p>

                            <h2 style="margin:0 0 16px;
                                color:#5B21B6;font-size:25px;
                                line-height:1.4;">
                                ${safeTitle}
                            </h2>

                            <p style="margin:0 0 24px;
                                color:#475569;font-size:15px;
                                line-height:1.8;">
                                ${safeMessage}
                            </p>

                            ${
                                otp != null
                                    ? `
                                    <!-- OTP Card -->
                                    <table role="presentation" width="100%"
                                        cellspacing="0" cellpadding="0"
                                        border="0"
                                        style="margin:24px 0;
                                        background:#F5F3FF;
                                        border:1px dashed #A78BFA;
                                        border-radius:14px;">
                                        <tr>
                                            <td align="center"
                                                style="padding:25px 12px;">

                                                <p style="margin:0 0 14px;
                                                    font-size:12px;
                                                    font-weight:bold;
                                                    letter-spacing:1.5px;
                                                    color:#6D28D9;">
                                                    YOUR ONE-TIME PASSWORD
                                                </p>

                                                <div style="font-size:32px;
                                                    font-weight:bold;
                                                    letter-spacing:8px;
                                                    color:#5B21B6;
                                                    overflow-wrap:anywhere;">
                                                    ${safeOtp}
                                                </div>

                                                <p style="margin:15px 0 0;
                                                    font-size:12px;
                                                    line-height:1.6;
                                                    color:#6B7280;">
                                                    Use this code to complete
                                                    your request.
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                    `
                                    : ""
                            }

                            ${
                                buttonText
                                    ? `
                                    <!-- Status Banner -->
                                    <table role="presentation" width="100%"
                                        cellspacing="0" cellpadding="0"
                                        border="0" style="margin:24px 0;">
                                        <tr>
                                            <td align="center"
                                                style="padding:15px 12px;
                                                background:#F5F3FF;
                                                border:1px solid #DDD6FE;
                                                border-radius:10px;
                                                color:#6D28D9;
                                                font-size:13px;
                                                font-weight:bold;
                                                letter-spacing:.5px;">
                                                ${escapeHtml(buttonText)}
                                            </td>
                                        </tr>
                                    </table>
                                    `
                                    : ""
                            }

                            ${
                                otp != null
                                    ? `
                                    <p style="margin:20px 0;
                                        font-size:13px;line-height:1.8;
                                        color:#64748B;">
                                        <strong>Security reminder:</strong>
                                        Never share this OTP with anyone.
                                        If you did not request this action,
                                        do not use the code.
                                    </p>
                                    `
                                    : ""
                            }

                            <p style="margin:24px 0 0;
                                font-size:14px;line-height:1.8;
                                color:#475569;">
                                ${safeFooter}
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center"
                            style="padding:25px 20px;
                            background:#FAF9FF;
                            border-top:1px solid #EDE9FE;">

                            <p style="margin:0 0 8px;
                                color:#5B21B6;font-size:15px;
                                font-weight:bold;">
                                Janta Paints &amp; Hardware
                            </p>

                            <p style="margin:0 0 14px;
                                color:#64748B;font-size:12px;
                                line-height:1.8;">
                                Your trusted destination for paints,
                                hardware and quality products.
                            </p>

                            <div style="width:55px;height:3px;
                                background:#7C3AED;margin:0 auto 14px;
                                border-radius:5px;"></div>

                            <p style="margin:0;font-size:11px;
                                line-height:1.8;color:#94A3B8;">
                                &copy; ${new Date().getFullYear()}
                                Janta Paints &amp; Hardware.
                                All rights reserved.
                            </p>

                            <p style="margin:8px 0 0;
                                font-size:11px;color:#94A3B8;">
                                This is an automated email.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>`;
};


// 1. USER VERIFICATION EMAIL
export const user_verification_mail = async (name, email, otp) => {
    try {
        const html = getEmailTemplate({
            name,
            title: "Verify Your Email Address",
            message:
                "Welcome to Janta Paints & Hardware! Please use the one-time password below to verify your email address and complete your registration.",
            otp,
            footerMessage:
                "We're delighted to have you join our community. Thank you for choosing us.",
        });

        const info = await transporter.sendMail({
            from: `"${BRAND_NAME}" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Verify Your Email | Janta Paints & Hardware",
            text:
                `Hello ${name || "Customer"}, your verification OTP is ${otp}. ` +
                "Never share this code with anyone.",
            html,
        });

        console.log("Verification email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Verification email error:", error.message);
        throw error;
    }
};


// 2. USER DELETE ACCOUNT EMAIL
export const user_delete_account_mail = async (name, email, otp) => {
    try {
        const html = getEmailTemplate({
            name,
            title: "Confirm Account Deletion",
            message:
                "We received a request to delete your account. To protect your account, enter the OTP below on the account deletion screen to confirm this action.",
            otp,
            footerMessage:
                "If you did not request account deletion, do not share this OTP and contact our support team.",
        });

        const info = await transporter.sendMail({
            from: `"${BRAND_NAME}" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Account Deletion Confirmation | Janta Paints & Hardware",
            text:
                `Hello ${name || "Customer"}, your account deletion confirmation OTP is ${otp}. ` +
                "If you did not request this, do not share the code.",
            html,
        });

        console.log("Account deletion email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Account deletion email error:", error.message);
        throw error;
    }
};


// 3. USER LOGIN EMAIL
export const user_login_mail = async (name, email) => {
    try {
        const html = getEmailTemplate({
            name,
            title: "Welcome Back!",
            message:
                "You have successfully signed in to your Janta Paints & Hardware account. We're glad to see you again!",
            buttonText: "LOGIN SUCCESSFUL",
            footerMessage:
                "Enjoy a smooth and secure experience with Janta Paints & Hardware.",
        });

        const info = await transporter.sendMail({
            from: `"${BRAND_NAME}" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Login Successful | Janta Paints & Hardware",
            text:
                `Hello ${name || "Customer"}, you have successfully logged in ` +
                "to your Janta Paints & Hardware account.",
            html,
        });

        console.log("User login email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("User login email error:", error.message);
        throw error;
    }
};


// 4. ADMIN LOGIN EMAIL
export const admin_login_mail = async (name, email) => {
    try {
        const html = getEmailTemplate({
            name,
            title: "Admin Login Notification",
            message:
                "A successful login to the Janta Paints & Hardware administration panel has been recorded. If this was you, no action is required.",
            buttonText: "ADMIN ACCESS CONFIRMED",
            footerMessage:
                "If you did not perform this login, secure your administrator account immediately and review recent account activity.",
        });

        const info = await transporter.sendMail({
            from: `"${BRAND_NAME}" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Admin Login Alert | Janta Paints & Hardware",
            text:
                `Hello ${name || "Admin"}, a successful login to the Janta Paints & Hardware ` +
                "admin panel has been recorded. If this was not you, secure your account immediately.",
            html,
        });

        console.log("Admin login email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Admin login email error:", error.message);
        throw error;
    }
};
