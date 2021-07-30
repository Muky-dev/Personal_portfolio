import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({ auth: false, message: 'No token provided' });
    }

    if (typeof token === 'string') {
        jwt.verify(token, process.env.JWT_AUTH_SECRET, (err, decoded) => {
            if (err) {
                res.status(500).json({ auth: false, message: 'Failed to authenticate token' });
            }
            if (decoded) {
                req.user = {};
                req.user.id = decoded.id;
                next();
            }
        });
    }
}