import { Request, Response } from 'express';
import { IUser } from '../types/user';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcrypt';

const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, username, nickname, bio, password } = req.body
        const hashedPass: string = await bcrypt.hash(password, 10)
        const userModel: IUser = new User({
            email: email,
            nickname: nickname,
            bio: bio,
            username: username,
            password: hashedPass,
        });

        const newUser: IUser = await userModel.save();

        res.status(201).json({
            message: "Successfully created user"
        });

    } catch (error) {
        res.status(500).json({
            message: "User not created",
            error: error
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
            const token = jwt.sign({ id: _id }, secret, { expiresIn: '1d' });
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

const logout = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ auth: false, token: null });
}

export { register, login, logout }