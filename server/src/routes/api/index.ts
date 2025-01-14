import { Router } from 'express';
import { userRouter } from './userRoutes';
import { quoteRouter } from './quoteRoutes';

const router = Router();

router.use('/quotes', quoteRouter);
router.use('/users', userRouter);

export default router;
