import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getUserById
} from "../../controllers/userController";

const router = express.Router();

// GET /users - GET ALL USERS
router.get("/", getAllUsers);

// GET /users/:id - GET A USER BY ID
router.get("/:id", getUserById);

// POST /users/ - CREATE A USER
router.post("/", createUser);

router.put("/:id", updateUser);

// DELETE /users/:id - DELETE A USER
router.delete("/:id", deleteUser);

export { router as userRouter };