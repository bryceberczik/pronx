import { Response, Request } from "express";
import { Calendar, User } from "../models/index";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Calendar, }],
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.create({ firstName, lastName, email, password });

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
      const user = await User.findByPk(id);
      if (user) {
        if (email !== undefined) user.email = email;
        if (password !== undefined) user.password = password;
        await user.save();
        
        const { password: _, ...userWithoutPassword } = user.toJSON();
        res.json(userWithoutPassword);
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      res.json({ message: "User not found." });
    } else {
      await user.destroy();
      res.json({ message: "User deleted successfully." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
