import { Router } from "express";
import uploads from "./uploads";
import { getProjects, addProject, updateProject, deleteProject } from "../controllers/projects";

const router = Router();

router.get('/getProjects', getProjects);
router.post('/addProject', uploads.single('coverImage'), addProject);
router.put('/updateProject/:id', updateProject);
router.delete('/deleteProject/:id', deleteProject);

export default router