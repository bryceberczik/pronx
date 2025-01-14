import { Router } from 'express';
import authRoutes from './auth-routes';
import apiRoutes from './api/index';
// import { authenticateToken } from '../utils/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api',
    //  authenticateToken,
      apiRoutes);

export default router;
