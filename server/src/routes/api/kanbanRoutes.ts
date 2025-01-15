import express from "express";
import {
  getKanbans,
  getKanbanById,
  createKanban,
  updateKanban,
  deleteKanban,
  getTasksByKanban,
  getTaskByIdWithKanban,
  createTask,
  updateTask,
  deleteTask,
} from "../../controllers/kanbanController";

const router = express.Router();

// KANBAN BOARD ROUTES
router.get("/", getKanbans);
router.get("/:id", getKanbanById);
router.post("/", createKanban);
router.put("/:id", updateKanban);
router.delete("/:id", deleteKanban);

// TASK ROUTES
router.get("/:kanbanId/tasks", getTasksByKanban);
router.get("/:kanbanId/tasks/:id", getTaskByIdWithKanban);
router.post("/:kanbanId/tasks", createTask);
router.put("/:kanbanId/tasks/:id", updateTask);
router.delete("/:kanbanId/tasks/:id", deleteTask);

export { router as kanbanRouter };
