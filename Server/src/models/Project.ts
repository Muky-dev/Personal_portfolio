import { IProject } from '../types/project';
import { model, Schema } from 'mongoose';

const projectSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        image_url: {
            type: String,
            required: true
        },
        dev_status: {
            type: Boolean,
            required: true
        },
    },
    { timestamps: true}
);

export default model<IProject>("Project", projectSchema);