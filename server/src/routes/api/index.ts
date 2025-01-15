import { Router } from 'express';
import { userRouter } from './userRoutes';
import { quoteRouter } from './quoteRoutes';
import { kanbanRouter } from './kanbanRoutes';
import { routineRouter } from './routineRoutes';
import { calenderRouter } from './calenderRoutes';

const router = Router();

router.use('/quotes', quoteRouter);
router.use('/users', userRouter);
router.use('/kanbans', kanbanRouter);
router.use('/routines', routineRouter);
router.use('/calendars', calenderRouter);

export default router;
