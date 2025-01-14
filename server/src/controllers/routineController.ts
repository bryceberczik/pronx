import { Request, Response } from "express";
import { Routine } from "../models/index";

export const getRoutine = async (_req: Request, res: Response) => {

    try {
        const routine = await Routine.findAll();
        res.json(routine);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const createRoutine = async (req: Request, res: Response) => {

    const { userId } = req.body;
    try {
        
        const routine = await Routine.create({
            userId,
            routineSteps: []
        })
        res.json(routine);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}