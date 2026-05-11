import nodemailer from "nodemailer";
import { config } from 'dotenv';

config({ path: '.env.local' });

// Server-only email service
export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(config: EmailConfig) {
    this.transporter = nodemailer.createTransport(config);
  }

  async sendEmail(to: string, subject: string, html: string, text?: string): Promise<boolean> {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_FROM || '"Heritage Trail Tours" <saljays.dev@gmail.com>',
        to,
        subject,
        html,
        text: text || this.stripHtml(html),
      });
      console.log("Email sent successfully:", info.messageId);
      return true;
    } catch (error) {
      console.error("Email sending failed:", error);
      return false;
    }
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }
}

// Create email service instance
let emailService: EmailService | null = null;

export function getEmailService(): EmailService | null {
  if (!emailService) {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      console.warn("Email service not configured - missing SMTP environment variables");
      return null;
    }

    const config: EmailConfig = {
      host,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user,
        pass,
      },
      from: process.env.SMTP_FROM || '"Heritage Trail Tours" <noreply@heritagetrailtours.com>',
    };

    emailService = new EmailService(config);
  }

  return emailService;
}