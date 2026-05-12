import { Router } from 'express';
import * as settingsController from '../controllers/settingsController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', settingsController.getSettings);
router.put('/', authenticateToken, settingsController.updateSettings);

export default router;
