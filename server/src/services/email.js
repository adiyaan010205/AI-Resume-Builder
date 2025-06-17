const nodemailer = require('nodemailer');
const config = require('../utils/config');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure,
      auth: {
        user: config.email.user,
        pass: config.email.password
      }
    });
  }

  async sendEmail(options) {
    try {
      const mailOptions = {
        from: `"${config.email.fromName}" <${config.email.fromEmail}>`,
        ...options
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info('Email sent successfully', { messageId: info.messageId });
      return info;
    } catch (error) {
      logger.error('Error sending email', { error });
      throw error;
    }
  }

  async sendWelcomeEmail(user) {
    const options = {
      to: user.email,
      subject: 'Welcome to AI Resume Builder',
      html: `
        <h1>Welcome to AI Resume Builder!</h1>
        <p>Hi ${user.fullName},</p>
        <p>Thank you for joining AI Resume Builder. We're excited to help you create professional resumes with the power of AI.</p>
        <p>Get started by:</p>
        <ul>
          <li>Creating your first resume</li>
          <li>Exploring our templates</li>
          <li>Using AI to enhance your content</li>
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Best regards,<br>The AI Resume Builder Team</p>
      `
    };

    return this.sendEmail(options);
  }

  async sendPasswordResetEmail(user, resetToken) {
    const resetUrl = `${config.clientUrl}/reset-password?token=${resetToken}`;
    
    const options = {
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset Request</h1>
        <p>Hi ${user.fullName},</p>
        <p>We received a request to reset your password. Click the link below to reset your password:</p>
        <p><a href="${resetUrl}">Reset Password</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The AI Resume Builder Team</p>
      `
    };

    return this.sendEmail(options);
  }

  async sendResumeSharedEmail(user, sharedBy, resumeTitle) {
    const options = {
      to: user.email,
      subject: 'Resume Shared with You',
      html: `
        <h1>Resume Shared with You</h1>
        <p>Hi ${user.fullName},</p>
        <p>${sharedBy.fullName} has shared a resume with you:</p>
        <p><strong>Resume Title:</strong> ${resumeTitle}</p>
        <p>You can view the resume by logging into your account.</p>
        <p>Best regards,<br>The AI Resume Builder Team</p>
      `
    };

    return this.sendEmail(options);
  }

  async sendSubscriptionConfirmation(user, plan) {
    const options = {
      to: user.email,
      subject: 'Subscription Confirmation',
      html: `
        <h1>Subscription Confirmed</h1>
        <p>Hi ${user.fullName},</p>
        <p>Thank you for subscribing to our ${plan} plan!</p>
        <p>You now have access to:</p>
        <ul>
          <li>Premium templates</li>
          <li>Advanced AI features</li>
          <li>Priority support</li>
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Best regards,<br>The AI Resume Builder Team</p>
      `
    };

    return this.sendEmail(options);
  }
}

module.exports = new EmailService(); 