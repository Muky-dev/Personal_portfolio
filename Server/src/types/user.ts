import { Document } from 'mongoose';
import { IProject } from './project';

export interface IUser extends Document {
    username: string
    nickname: string
    email: string
    bio: string
    projects: IProject[]
    verified: boolean
    password: string
}