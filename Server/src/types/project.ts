import { Document } from 'mongoose';

export interface IProject extends Document {
    name: string
    author: string
    url: string
    image_url: string
    dev_status: boolean
}