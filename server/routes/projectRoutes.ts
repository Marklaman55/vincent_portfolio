import { Router } from 'express';
import * as projectController from '../controllers/projectController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', projectController.getProjects);
router.post('/', authenticateToken, projectController.saveProject);
router.delete('/:id', authenticateToken, projectController.deleteProject);

export default router;
