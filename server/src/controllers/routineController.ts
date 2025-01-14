import { Request, Response, RequestHandler } from "express";
import { Routine } from "../models/index";

export const getRoutine = async (_req: Request, res: Response) => {
  try {
    const routine = await Routine.findAll();
    res.json(routine);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createRoutine: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;

  try {

    const existingRoutine = await Routine.findOne({
      where: { userId },
    });

    if (existingRoutine) {

      res.status(400).json({ message: "User already has a routine. Cannot have more than one." });
      return;
    }

    const routine = await Routine.create({
      userId,
      routineSteps: [],
    });

    res.json(routine);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const addSteps: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const routine = await Routine.findByPk(id);

    if (!routine) {
      res.status(404).json({ message: "Routine not found." });
      return;
    }

    const newOrder = routine.routineSteps.length + 1;

    const newStep = { title, order: newOrder };

    routine.routineSteps = [...routine.routineSteps, newStep];

    await routine.save();

    res.json(routine);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const removeSteps: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { order } = req.body;

  try {
    const routine = await Routine.findByPk(id);

    if (!routine) {
      res.status(404).json({ message: "Routine not found." });
      return;
    }

    const stepIndex = routine.routineSteps.findIndex((step) => step.order === order);

    if (stepIndex === -1) {
      res.status(404).json({ message: "Step not found." });
      return;
    }

    routine.routineSteps.splice(stepIndex, 1);

    routine.routineSteps = routine.routineSteps.map((step, index) => ({
      ...step,
      order: index + 1,
    }));

    await routine.save();

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
      res.status(404).json({ message: "No routine found." })
    }

    await routine?.destroy();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};