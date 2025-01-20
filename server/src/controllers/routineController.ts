import { Request, Response, RequestHandler } from "express";
import { Routine, RoutineSteps } from "../models/index";

export const getRoutine = async (_req: Request, res: Response) => {
  try {
    const routine = await Routine.findAll({
      include: [{ model: RoutineSteps }],
    });
    res.json(routine);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoutineById = async (req: Request, res: Response) => {
  const { routineId } = req.params;
  try {
    const routine = await Routine.findByPk(routineId, {
      include: [{ model: RoutineSteps }],
    });
    res.json(routine);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const createRoutine: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingRoutine = await Routine.findOne({
      where: { userId },
    });

    if (existingRoutine) {
      res.status(400).json({ message: "This user already has a routine." });
      return;
    }

    const routine = Routine.create({ userId });

    res.json(routine);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRoutine = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const routine = await Routine.findByPk(id);

    if (!routine) {
      res.status(404).json({ message: "No routine found with this ID." });
      return;
    }

    await routine.destroy();
    res.json({ message: "Routine deleted." });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getStepsByRoutine: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { routineId } = req.params;
  try {
    const steps = await RoutineSteps.findAll({
      where: { routineId },
    });

    if (steps.length === 0) {
      res.json({ message: "No steps found for this routine." });
      return;
    }

    res.json(steps);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getStepByIdWithRoutine: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { routineId, id } = req.params;

  try {
    const step = await RoutineSteps.findOne({
      where: { id, routineId },
    });

    if (!step) {
      res.status(404).json({ message: "Step not found for this routine." });
      return;
    }

    res.json(step);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createStep: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { routineId } = req.params;
  const { title } = req.body;

  try {
    const routine = await Routine.findByPk(routineId);
    if (!routine) {
      res.status(404).json({ message: "Routine not found." });
      return;
    }

    const step = await RoutineSteps.create({
      title,
      routineId,
    });

    res.json(step);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStep: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { routineId, id } = req.params;
  const { title } = req.body;

  try {
    const step = await RoutineSteps.findOne({
      where: { id: id, routineId },
    });

    if (!step) {
      res.status(404).json({ message: "Step not found for this routine." });
      return;
    }

    step.title = title || step.title;
    await step.save();

    res.json(step);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStep: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { routineId, id } = req.params;

  try {
    const step = await RoutineSteps.findOne({
      where: { id: id, routineId },
    });

    if (!step) {
      res.status(404).json({ message: "Step not found." });
      return;
    }

    await step.destroy();
    res.json({ message: `Step deleted under routine ${routineId} ID.` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};