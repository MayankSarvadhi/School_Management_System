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

    constructor(types: string, emails: string, extra:string) {
        let subject = '', htmlContent = '';
        switch (types) {

            case NotificationTypes.INVITE:
                subject = 'Invitation to Our App';
                htmlContent = `
                        <h1>Invite Notification</h1>
                        <p>Hello there!</p>
                        <p>You have been invited to join our app. Click the link below to create your new password.</p>
                        <p>This password or link never shar to other person</p>
                        <p>Invitation Link: ${ extra }</p>
                        <p>Regards,</p>
                        
                        <p>Your App Team</p>`;
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
                console.log(err);
                logger.error(`Error sending email: ${err}`);
            }
        })();
    }
}