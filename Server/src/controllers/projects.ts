import { Request, Response } from 'express';
import Project from "../models/Project";

const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await Project.find();
        res.status(200).json({ projects });
    } catch (error) {
        throw Error(error);
    }
}