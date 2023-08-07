/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import nodemailer, { Transporter } from 'nodemailer';
import AppError from './appErrorGenerator';
import * as dotenv from 'dotenv';
dotenv.config();
import { logger } from '../logger/logger';

export enum NotificationTypes {
    INVITE = 'invite',
    MESSAGE = 'message',
    CELEBRATION = 'celebration'
}

const transporter: Transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PSW,
    }
});

export class SendNotificationEmail {

    constructor(types: string, emails: string, extra: string, token: string) {
        let subject = '', htmlContent = '';
        switch (types) {

            case NotificationTypes.INVITE:
                subject = 'Invitation to Our App';
                htmlContent = `
                        <html>
            <head>
                <style>
                    /* Add your CSS styles here */
                    .email-container {
                        background-color: #f5f5f5;
                        padding: 20px;
                        border-radius: 5px;
                        font-family: Arial, sans-serif;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: #fff !important;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <h1>Invite Notification</h1>
                    <p>Hello there!</p>
                    <p>You have been added to the organization in Your School App by the organization's admin Principal.</p>
                    <p>This password or link should never be shared with others.</p>
                    <a class="button" href="${extra}">Create Password</a>
                    <p>Regards,</p>
                    <p>Your App Team</p>
                </div>
            </body>
            </html>`;
                break;

            case NotificationTypes.MESSAGE:

                subject = 'New Message Notification';
                htmlContent = `
                        <h1>Message Notification</h1>
                        <p>Hello,</p>
                        <p>You have received a new message:</p>
                        <p>Message Content: ${extra}</p>
                        <p>Regards,</p>
                        <p>Your App Team</p>`;
                break;

            case NotificationTypes.CELEBRATION:

                subject = 'Celebration Notification';
                htmlContent = `
                        <h1>Celebration Notification</h1>
                        <p>Hello,</p>
                        <p>Congratulations! We are celebrating ${extra}.</p>
                        <p>Regards,</p>
                        <p>Your App Team</p>`;
                break;

            default:
                throw new AppError('Invalid notification type', 'invalid_request');

        }
        const mailOptions = {
            from: process.env.GMAIL,
            to: emails,
            subject,
            html: htmlContent,

        };
        (async () => {
            try {
                await transporter.sendMail(mailOptions);
                logger.info(`Email sent successfully to ${emails}`);

            } catch (err) {
                logger.error(`Error sending email: ${err}`);
            }
        })();
    }
}