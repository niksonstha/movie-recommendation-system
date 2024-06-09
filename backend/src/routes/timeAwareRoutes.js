import express from "express";
import { getTimeAwareRecommendations } from "../controllers/timeAwareController.js";
const router = express.Router();

router.get("/getTimeAwareRecommendations/:userId", getTimeAwareRecommendations);

export default router;
