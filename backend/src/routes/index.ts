import { Router } from 'express';
import authRoutes from './authRoutes';
import projectRoutes from './projectRoutes';
import messageRoutes from './messageRoutes';
import serviceRoutes from './serviceRoutes';
import settingsRoutes from './settingsRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/messages', messageRoutes);
router.use('/services', serviceRoutes);
router.use('/settings', settingsRoutes);

export default router;
