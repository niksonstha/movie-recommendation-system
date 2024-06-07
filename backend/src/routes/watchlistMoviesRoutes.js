import express from "express";
const router = express.Router();
import { watchlist, getWatchlist } from "../controllers/watchlistController.js";

router.post("/", watchlist);
router.get("/getWatchlist/:id", getWatchlist);

export default router;
