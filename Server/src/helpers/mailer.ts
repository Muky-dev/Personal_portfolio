import sgMail from '@sendgrid/mail';
import { IMailer } from '../types/mail';

const sendMail = async (data: IMailer): Promise<string> => {
    try {
        if (!process.env.SENDGRID_API_KEY) {
            return Promise.reject('Error');
        }
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        await sgMail.send({
            to: data.to,
            from: data.from,
            subject: data.subject,
            html: data.body
        });
        return 'Email sent'
    } catch (error) {
        return error;
    }
}

export default sendMail