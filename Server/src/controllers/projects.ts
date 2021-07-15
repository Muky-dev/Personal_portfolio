import { Request, Response } from 'express';
import { IProject } from '../types/project';
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

        const newProject: IProject = new Project ({
            name: body.name,
            url: body.projecturl,
            image_url: image?.path,
            dev_status: body.status
        });

        res.status(201).json({
            message: "Project created",
            project: newProject
        });
    } catch(error) {
        throw Error(error)
    }
}

const updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req

        const updatedProject:IProject | null = await Project.findByIdAndUpdate({ _id: id }, body);
        
        res.status(200).json({
            message: "Project updated",
            project: updateProject
        });
    } catch (error) {
        throw Error(error);
    }
}

const deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedProject: IProject | null = await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Project deleted",
            project: deletedProject
        });
    } catch(error) {
        throw Error(error);
    }
}

export { getProjects, addProject, updateProject, deleteProject }