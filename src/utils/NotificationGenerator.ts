/* eslint-disable max-len */
import nodemailer, { Transporter } from 'nodemailer';
import AppError from './appErrorGenerator';
import { logger } from '../logger/logger';

const transporter: Transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'smitlakhani2062002@gmail.com',
        pass: 'orwgfcuikwfridhc',
    },

});

export enum NotificationTypes {
    INVITE = 'invite',
    MESSAGE = 'message',
    CELEBRATION = 'celebration'
}

export class SendNotificationEmail {

    constructor(types: string, emails: string, extra:string) {
        let subject = '', htmlContent = '';
        switch (types) {

            case NotificationTypes.INVITE:
                subject = 'Invitation to Our App';
                htmlContent = `
                        <h1>Invite Notification</h1>
                        <p>Hello there!</p>
                        <p>You have been invited to join our app. Click the link below to create an account.</p>
                        <p>Invitation Link: http://localhost:3000</p>
                        <p>Regards,</p>
                        <p>${ extra }</p>
                        <p>Your App Team</p>`;
                break;

            case NotificationTypes.MESSAGE:

                subject = 'New Message Notification';
                htmlContent = `
                        <h1>Message Notification</h1>
                        <p>Hello,</p>
                        <p>You have received a new message:</p>
                        <p>Message Content: ${emails}</p>
                        <p>Regards,</p>
                        <p>Your App Team</p>`;
                break;

            case NotificationTypes.CELEBRATION:

                subject = 'Celebration Notification';
                htmlContent = `
                        <h1>Celebration Notification</h1>
                        <p>Hello,</p>
                        <p>Congratulations! We are celebrating ${emails}.</p>
                        <p>Regards,</p>
                        <p>Your App Team</p>`;
                break;

            default:
                throw new AppError('Invalid notification type', 'invalid_request');

        }
        const mailOptions = {
            from: 'mayankkathiriya008@gmail.com',
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

// const sendNotificationEmail = async (type: string, params: any): Promise<void> => {

//     let subject = '', htmlContent = '';
//     switch (type) {

//         case 'invite':
//             subject = 'Invitation to Our App';
//             htmlContent = `
//             <h1>Invite Notification</h1>
//             <p>Hello there!</p>
//             <p>You have been invited to join our app. Click the link below to create an account.</p>
//             <p>Invitation Link: https://your-app.com/invitation/${params.emailAddress}</p>
//             <p>Regards,</p>
//             <p>Your App Team</p>`;
//             break;

//         case 'message':

//             subject = 'New Message Notification';
//             htmlContent = `
//             <h1>Message Notification</h1>
//             <p>Hello,</p>
//             <p>You have received a new message:</p>
//             <p>Message Content: ${params.messageContent}</p>
//             <p>Regards,</p>
//             <p>Your App Team</p>`;

//             break;

//         case 'celebration':

//             subject = 'Celebration Notification';
//             htmlContent = `
//             <h1>Celebration Notification</h1>
//             <p>Hello,</p>
//             <p>Congratulations! We are celebrating ${params.occasion}.</p>
//             <p>Regards,</p>
//             <p>Your App Team</p>`;

//             break;

//         default:
//             throw new AppError('Invalid notification type', 'invalid_request');

//     }
//     const mailOptions = {
//         from: 'your-email@gmail.com',
//         to: params.emailAddress,
//         subject,
//         html: htmlContent,

//     };
//     try {
//         await transporter.sendMail(mailOptions);
//         console.log(`Email sent successfully to ${params.emailAddress}`);

//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };

// export { sendNotificationEmail };
