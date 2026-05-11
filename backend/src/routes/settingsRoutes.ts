import { Router } from 'express';
import * as settingsController from '../controllers/settingsController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', settingsController.getSettings);
router.put('/', authenticateToken, settingsController.updateSettings);

export default router;
