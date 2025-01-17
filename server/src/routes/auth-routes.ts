import { Router, type Request, type Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: any) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ email }, secretKey, { expiresIn: '7d' });
  return res.json({ token });
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = await User.create({ firstName, lastName, email, password });

    console.log(newUser);

    const secretKey = process.env.JWT_SECRET_KEY || "";

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      secretKey,
      { expiresIn: "7d" }
    );
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);
router.post('/signup', signUp);

export default router;
