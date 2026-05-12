import { Router } from 'express';
import * as messageController from '../controllers/messageController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, messageController.getMessages);
router.post('/', messageController.saveMessage);
router.put('/:id/status', authenticateToken, messageController.updateMessageStatus);
router.delete('/:id', authenticateToken, messageController.deleteMessage);

export default router;
