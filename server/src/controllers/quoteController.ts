import { Response, Request } from "express";
import quotes from "../utils/data/quotes.json";

export const getQuote = async (_req: Request, res: Response) => {
  try {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.status(200).json(randomQuote);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};