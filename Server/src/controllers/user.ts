import { Request, Response } from 'express';
import { IDecoded, IUser } from '../types/user';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { verify } from 'jsonwebtoken';

const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { username }
        } = req

        const user: IUser = await User.findOne({ username: username }).select({ password: 0, verified: 0 }).populate('projects').orFail();

        res.status(200).json({
            message: 'Successfully query',
            user: user
        });

    } catch (error) {
        res.status(400).json({
            message: 'Cannot find user',
            error: error
        });
    }
}

const changeForgetedPass = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { token },
            body: { newPassword }
        } = req

        if (!token) {
            res.status(401).json({ message: 'Please provide a valid token' });
        }

        const decoded = verify(token, process.env.JWT_FORGOT_SECRET);

        const hashedPass: string = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate((decoded as IDecoded).id, { password: hashedPass });

        res.status(200).json({ message: 'Successfully changed password' });
    } catch (error) {
        res.status(400).json(error);
    }
}

export { getUser, changeForgetedPass }