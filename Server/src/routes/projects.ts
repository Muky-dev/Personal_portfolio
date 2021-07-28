import { Router } from "express";
import uploads from "../helpers/uploads";
import { getProjects, addProject, updateProject, deleteProject } from "../controllers/projects";
import { validateToken } from "../middlewares/authentication";

const router: Router = Router();

router.get('/projects', getProjects);
router.post('/add-project', validateToken, uploads.single('coverImage'), addProject);
router.put('/edit-project/:id', validateToken, uploads.single('coverImage'), updateProject);
router.delete('/delete-project/:id', validateToken, deleteProject);

export default router