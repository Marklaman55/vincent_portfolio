import { Router } from 'express';
import * as messageController from '../controllers/messageController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, messageController.getMessages);
router.post('/', messageController.createMessage);
router.put('/:id/status', authenticateToken, messageController.updateMessageStatus);
router.delete('/:id', authenticateToken, messageController.deleteMessage);

export default router;
