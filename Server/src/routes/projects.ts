import { Router } from "express";
import uploads from "../helpers/uploads";
import { addProject, updateProject, deleteProject } from "../controllers/projects";
import { validateToken } from "../middlewares/authentication";

const router: Router = Router();

router.post('/add', validateToken, uploads.single('coverImage'), addProject);
router.put('/edit/:id', validateToken, uploads.single('coverImage'), updateProject);
router.delete('/delete/:id', validateToken, deleteProject);

export default router