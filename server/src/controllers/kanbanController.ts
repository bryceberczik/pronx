import { Request, Response, RequestHandler } from "express";
import { KanbanBoard, Task } from "../models/index";

export const getKanbans: RequestHandler = async (_req: Request, res: Response) => {
  try {
    const kanbans = await KanbanBoard.findAll({ include: [{ model: Task }] });
    res.json(kanbans);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getKanbanById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const kanban = await KanbanBoard.findByPk(id, { include: [{ model: Task }] });
    if (!kanban) {
      res.status(404).json({ message: "Kanban board not found." });
      return;
    }
    res.json(kanban);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createKanban: RequestHandler = async (req: Request, res: Response) => {
  const { name, userId } = req.body;
  try {
    const kanban = await KanbanBoard.create({ name, userId });
    res.json(kanban);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateKanban: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const kanban = await KanbanBoard.findByPk(id);
    if (!kanban) {
      res.status(404).json({ message: "Kanban board not found." });
      return;
    }
    kanban.name = name || kanban.name;
    await kanban.save();
    res.json(kanban);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteKanban: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const kanban = await KanbanBoard.findByPk(id);
    if (!kanban) {
      res.status(404).json({ message: "Kanban board not found." });
      return;
    }
    await kanban.destroy();
    res.json({ message: "Kanban board deleted." });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET TASKS FOR A KANBAN
export const getTasksByKanban: RequestHandler = async (req: Request, res: Response) => {
  const { kanbanId } = req.params;
  try {
    const tasks = await Task.findAll({ where: { kanbanId: kanbanId } });
    if (tasks.length === 0) {
      res.status(404).json({ message: "No tasks found for this Kanban board." });
      return;
    }
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET SPECIFIC TASK BY ID WITH KANBAN
export const getTaskByIdWithKanban: RequestHandler = async (req: Request, res: Response) => {
  const { kanbanId, id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, kanbanId: kanbanId } });
    if (!task) {
      res.status(404).json({ message: "Task not found for this Kanban board." });
      return;
    }
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE TASK FOR A KANBAN
export const createTask: RequestHandler = async (req: Request, res: Response) => {
  const { kanbanId } = req.params;
  const { title, description } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      status: "todo",
      kanbanId: kanbanId,
    });
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK
export const updateTask: RequestHandler = async (req: Request, res: Response) => {
  const { kanbanId, id } = req.params;
  const { title, status, description } = req.body;
  try {
    const task = await Task.findOne({ where: { id, kanbanId: kanbanId } });
    if (!task) {
      res.status(404).json({ message: "Task not found for this Kanban board." });
      return;
    }
    if (title) task.title = title;
    if (status) task.status = status;
    if (description) task.description = description;
    await task.save();
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TASK
export const deleteTask: RequestHandler = async (req: Request, res: Response) => {
  const { kanbanId, id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, kanbanId: kanbanId } });
    if (!task) {
      res.status(404).json({ message: "Task not found." });
      return;
    }
    await task.destroy();
    res.json({ message: "Task deleted." });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
