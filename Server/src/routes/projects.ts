import { Router } from "express";
import { getProjects, addProject } from "../controllers/projects";

const router = Router();

router.get('/getAllProjects', getProjects);
router.post('/addNewProject', addProject);

export default router