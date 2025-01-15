import express from "express";
import {
  createRoutine,
  createStep,
  deleteRoutine,
  getRoutine,
  getStepByIdWithRoutine,
  getStepsByRoutine,
  updateStep,
  deleteStep,
} from "../../controllers/routineController";

const router = express.Router();

// GET ROUTINE
router.get("/", getRoutine);

// CREATE ROUTINE
router.post("/", createRoutine);

// DELETE ROUTINE
router.delete("/:id", deleteRoutine);

// GET ALL STEPS
router.get("/:routineId/steps", getStepsByRoutine);

// GET SPECIFIC STEP
router.get("/:routineId/steps/:id", getStepByIdWithRoutine);

// CREATE STEP
router.post("/:routineId/steps/", createStep);

// UPDATE EVENT
router.put("/:routineId/steps/:id", updateStep);

// DELETE STEP
router.delete("/:routineId/steps/:id", deleteStep);

export { router as routineRouter };
