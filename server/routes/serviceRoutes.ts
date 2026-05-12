import { Router } from 'express';
import * as serviceController from '../controllers/serviceController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', serviceController.getServices);
router.post('/', authenticateToken, serviceController.saveService);
router.put('/:id', authenticateToken, serviceController.updateService);
router.delete('/:id', authenticateToken, serviceController.deleteService);

export default router;
