import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register); // Should be protected or disabled in production

export default router;
