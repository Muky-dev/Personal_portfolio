import { IUser } from '../types/user';
import { Schema, model } from 'mongoose';

const userSchema: Schema = new Schema(
    {
        username: {
            type: String,
            lowercase: true,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true
        }
    }
);

export default model<IUser>('User', userSchema);