import express from "express";
import { getMatrixFactorizationRecommendations } from "../controllers/matrixFactorizationController.js";

const router = express.Router();

router.get("/getMatrixRecommendations/:userId", getMatrixFactorizationRecommendations);

export default router;
