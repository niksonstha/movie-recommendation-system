import express from "express";
import { addRating, getUserRating } from "../controllers/ratingController.js";

const router = express.Router();

router.post("/addRating", addRating);
router.get("/getUserRating/:movieId/:userId", getUserRating);

export default router;
