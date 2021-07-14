import { Request, Response } from 'express';
import { IProject } from '../types/Project';
import Project from '../models/Project';

const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await Project.find();
        res.status(200).json({ projects });
    } catch (error) {
        throw Error(error);
    }
}

const addProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body
        const project: IProject = new Project ({
            name: body.name,
            url: body.projecturl,
            image_url: body.image,
            dev_status: body.status
        });
    } catch(error) {
        throw Error(error)
    }
}

export { getProjects, addProject }