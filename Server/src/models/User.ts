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
        nickname: {
            type: String,
            required: 'Please provide a nickname'
        },
        email: {
            type: String,
            required: 'An email address is required',
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        projects: [{
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }],
        bio: {
            type: String,
            default: ""
        },
        password: {
            type: String,
            required: 'Please provide a password'
        }
    }, { timestamps: true }
);

export default model<IUser>('User', userSchema);