import { Request, Response } from 'express';
import { IProject } from '../types/Project';
import Project from '../models/Project';

const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects: IProject[] = await Project.find();
        res.status(200).json({ projects });
    } catch (error) {
        throw Error(error);
    }
}

const addProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body
        const image = req.file

        const project: IProject = new Project ({
            name: body.name,
            url: body.projecturl,
            image_url: image?.path,
            dev_status: body.status
        });

        res.status(201).json({project});
    } catch(error) {
        throw Error(error)
    }
}

export { getProjects, addProject }