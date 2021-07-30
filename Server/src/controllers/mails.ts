import { Request, Response } from 'express';
import User from '../models/User';
import sendMail from '../helpers/mailer';
import { IMailer } from '../types/mail';
import { hashJWT } from '../helpers/hasher';

const sendForgotEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            body: { email, changePassRoute }
        } = req

        const user = await User.findOne({ email: email }).select({ _id: 1 }).orFail();
        const JWT = await hashJWT(user._id, process.env.JWT_FORGOT_SECRET);

        const mail: IMailer = {
            from: process.env.MAIL_PROVIDER,
            to: email,
            subject: 'Confirmation link for password change',
            body: `<a href="${changePassRoute}/?token=${JWT.mailToken}">Reset Password</a>
            <p>Link expires in ${JWT.expiration}</p>`
        }
        const mailed = await sendMail(mail);
        res.status(200).json({ message: mailed });
    }
    catch (error) {
        res.status(400).json({ message: 'Something went wrong', error });
    }
}

export { sendForgotEmail }