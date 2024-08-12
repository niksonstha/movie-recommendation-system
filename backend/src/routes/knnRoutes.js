// routes/knn.js
import express from "express";
import { getKnnRecommendations } from "../controllers/knnController.js";

const router = express.Router();

router.get("/knnrecommend/:userId", getKnnRecommendations);

export default router;
