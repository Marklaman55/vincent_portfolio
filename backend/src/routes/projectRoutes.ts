import { Router } from 'express';
import * as projectController from '../controllers/projectController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', projectController.getProjectsHandler);
router.post('/', authenticateToken, projectController.createProject);
router.put('/:id', authenticateToken, projectController.updateProject);
router.delete('/:id', authenticateToken, projectController.deleteProject);

export default router;
