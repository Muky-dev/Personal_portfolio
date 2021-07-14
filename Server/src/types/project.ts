import { Document } from 'mongoose';

export interface IProject extends Document {
    name: string,
    url: string,
    dev_status: boolean,
    image_url: string
}