import { Router } from 'express';
import { getUser, changeForgetedPass } from '../controllers/user';

const router: Router = Router();

router.get('/:username', getUser);
router.post('/resetPass/:token', changeForgetedPass);

export default router