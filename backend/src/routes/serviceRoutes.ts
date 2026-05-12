import { Router } from 'express';
import * as serviceController from '../controllers/serviceController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', serviceController.getServices);
router.post('/', authenticateToken, serviceController.createService);
router.put('/:id', authenticateToken, serviceController.updateService);
router.delete('/:id', authenticateToken, serviceController.deleteService);

export default router;
