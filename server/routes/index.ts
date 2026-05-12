import { Router } from 'express';
import authRoutes from './authRoutes.js';
import projectRoutes from './projectRoutes.js';
import messageRoutes from './messageRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import settingsRoutes from './settingsRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/messages', messageRoutes);
router.use('/services', serviceRoutes);
router.use('/settings', settingsRoutes);

export default router;
