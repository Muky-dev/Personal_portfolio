import { IProject } from '../types/project';
import { model, Schema } from 'mongoose';

const projectSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            required: 'An author is needed',
            immutable: true,
            ref: 'User'
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