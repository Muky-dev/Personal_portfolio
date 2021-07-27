import { Request, Response } from 'express';
import { IUser } from '../types/user';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcrypt';

const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, username, password } = req.body
        const hashedPass: string = await bcrypt.hash(password, 10)
        const userModel: IUser = new User({
            email: email,
            username: username,
            password: hashedPass,
            isAdmin: true
        });

        const newUser: IUser = await userModel.save();

        res.status(201).json({
            message: "Successfully created user"
        });

    } catch {
        res.status(500).json({
            message: "User not created"
        });
    }
}

export { register }