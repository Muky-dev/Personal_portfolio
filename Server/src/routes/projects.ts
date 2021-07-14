import { Router } from "express";
import uploads from "./uploads";
import { getProjects, addProject, deleteProject } from "../controllers/projects";

const router = Router();

router.get('/getAllProjects', getProjects);
router.post('/addNewProject', uploads.single('coverImage'), addProject);
router.delete('/deleteProject/:id', deleteProject);

export default router