import { Router } from 'express';
import { getUser } from '../controllers/user';

const router: Router = Router();

router.get('/:username', getUser);

export default router