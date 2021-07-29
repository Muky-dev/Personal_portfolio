import { Request, Response } from 'express';
import { IUser } from '../types/user';
import User from '../models/User';

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
        res.status(500).json({
            message: 'Cannot find user',
            error: error
        });
    }
}

export { getUser }