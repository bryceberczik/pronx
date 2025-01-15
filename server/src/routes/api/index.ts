import { Router } from 'express';
import { userRouter } from './userRoutes';
import { quoteRouter } from './quoteRoutes';
// import { kanbanRouter } from './kanbanRoutes';
import { routineRouter } from './routineRoutes';
import { calenderRouter } from './calenderRoutes';

const router = Router();

router.use('/quotes', quoteRouter);
router.use('/users', userRouter);
// router.use('/kanban', kanbanRouter);
router.use('/routine', routineRouter);
router.use('/calender', calenderRouter);

export default router;
