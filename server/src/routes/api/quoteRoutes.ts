import express from "express";
import { getQuote } from "../../controllers/quoteController";

const router = express.Router();

// GET QOUTES

router.get("/", getQuote);

export { router as quoteRouter };