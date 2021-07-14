import { Document } from 'mongoose';

export interface IProject extends Document {
    name: string,
    url: string,
    image_url: string,
    dev_status: boolean
}