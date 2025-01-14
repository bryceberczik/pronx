import express from 'express';
import { createRoutine, getRoutine } from '../../controllers/routineController';

const router = express.Router();

router.get('/', getRoutine);
router.post('/', createRoutine);

export { router as routineRouter };