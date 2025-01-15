// import { Request, Response, RequestHandler } from "express";
// import { Routine } from "../models/index";

// export const getRoutine = async (_req: Request, res: Response) => {
//   try {
//     const routine = await Routine.findAll();
//     res.json(routine);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const createRoutine: RequestHandler = async (req: Request, res: Response): Promise<void> => {
//   const { userId } = req.body;

//   try {

//     const existingRoutine = await Routine.findOne({
//       where: { userId },
//     });

//     if (existingRoutine) {

//       res.status(400).json({ message: "User already has a routine. Cannot have more than one." });
//       return;
//     }

//     const routine = await Routine.create({
//       userId,
//       routineSteps: [],
//     });

//     res.json(routine);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };


// export const addSteps = async (req: Request, res: Response) => {
//   try {

//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };


// export const removeSteps: RequestHandler = async (req: Request, res: Response) => {
//   try {

//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteRoutine = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const routine = await Routine.findByPk(id);

//     if (!routine) {
//       res.status(404).json({ message: "No routine found." })
//     }

//     await routine?.destroy();
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };