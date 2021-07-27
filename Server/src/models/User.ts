import { IUser } from '../types/user';
import { Schema, model } from 'mongoose';

const userSchema: Schema = new Schema(
    {
        username: {
            type: String,
            lowercase: true,
            required: 'A username is required',
            unique: true
        },
        email: {
            type: String,
            required: 'An email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: 'Please provide a password'
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    }
);

export default model<IUser>('User', userSchema);