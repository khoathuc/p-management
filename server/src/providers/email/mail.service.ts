// mail.service.ts
import * as nodemailer from "nodemailer";
import { Injectable } from "@nestjs/common";
import { render } from "@react-email/components";

type EmailProps = {
    to: string;
    subject: string;
    template: string;
    text?: string;
};

@Injectable()
export class EmailService {
    // Setup Nodemailer transporter
    private _transporter;

    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST as string, // Ensure the type is string
            port: parseInt(process.env.SMTP_PORT as string, 10), // Convert port to a number
            auth: {
                user: process.env.SMTP_USER as string, // Ensure the type is string
                pass: process.env.SMTP_PASSWORD as string, // Ensure the type is string
            },
        });
    }

    isEnable = () => {
        return process.env.SMTP_HOST;
    };

    private generateEmail = (template) => {
        return render(template);
    };

    sendEmail = async (options: EmailProps) => {
        if (!this.isEnable()) {
            return;
        }

        const html = this.generateEmail(options.template);

        const emailDefaults = {
            from: process.env.SMTP_FROM,
        };

        await this._transporter.sendMail({
            ...emailDefaults,
            ...options,
            html
        });
    };

    async sendPasswordResetEmail(to: string, token: string) {
        const resetLink = `${process.env.FRONT_END_URL}/reset-password?token=${token}`;

        const mailOptions = {
            from: "Auth-backend service",
            to: to,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
        };

        await this._transporter.sendMail(mailOptions);
    }
}
