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


const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user: IUser | null = await User.findOne({ email: email });
        if (typeof user !== 'undefined' && user) {
            const hashedPass = user.password;
            const comparePass = await bcrypt.compare(password, hashedPass);
            if (!comparePass) {
                res.status(400).json({
                    message: "Wrong password"
                });
            }
            const secret: string = process.env.JWT_SECRET
            const { _id } = user
            const token = jwt.sign({ id: _id }, secret, { expiresIn: 300 });
            res.status(200).json({
                auth: true,
                token: token
            });
        }
        else if (!user) {
            res.status(400).json({
                message: "User don't exists"
            });
        }
    } catch {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

export { register, login }