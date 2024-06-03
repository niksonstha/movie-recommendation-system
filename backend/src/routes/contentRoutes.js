import express from "express";
const router = express.Router();
import { contentRecommend } from "../controllers/contentController.js";

router.get("/contentRecommend", contentRecommend);

export default router;
