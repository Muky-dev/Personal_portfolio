import { Router } from "express";
import uploads from "./uploads";
import { getProjects, addProject } from "../controllers/projects";

const router = Router();

router.get('/getAllProjects', getProjects);
router.post('/addNewProject', uploads.single('coverImage'), addProject);

export default router