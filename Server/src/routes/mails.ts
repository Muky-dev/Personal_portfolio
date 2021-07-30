import { Router } from 'express';
import { sendForgotEmail } from '../controllers/mails';

const router: Router = Router();

router.post('/forgotPassSend', sendForgotEmail);

export default router