import { Request, Response } from 'express';
import { IProject } from '../types/project';
import { IUser } from '../types/user';
import Project from '../models/Project';
import User from '../models/User';

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
        const {
            body,
            file,
            user
        } = req


        const newProject: IProject = await new Project({
            name: body.name,
            author: user.id,
            url: body.projecturl,
            image_url: file?.path,
            dev_status: body.status
        }).save();

        const Author: IUser | null = await User.findByIdAndUpdate(user.id, { $push: { projects: newProject._id } });

        res.status(201).json({
            message: "Project created",
            project: newProject
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
            user,
        } = req

        const updatedProject: IProject = await Project.findOneAndUpdate({ _id: id, author: user.id }, body, { new: true }).orFail();
        res.status(200).json({
            message: "Project updated",
            project: updatedProject
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            user
        } = req

        const deletedProject: IProject = await Project.findOneAndDelete({ _id: id, author: user.id }).orFail();

        res.status(200).json({
            message: "Project deleted",
            project: deletedProject
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

export { getProjects, addProject, updateProject, deleteProject }