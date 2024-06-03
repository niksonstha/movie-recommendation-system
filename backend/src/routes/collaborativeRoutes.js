import { collaborativeRecommend } from "../controllers/collaborativeController.js";

import express from "express";
const router = express.Router();

router.get("/collaborativeRecommend", collaborativeRecommend);

export default router;
