import express from "express";
const router = express.Router();
import {
  watchlist,
  getWatchlist,
  deleteWatchlistMovie,
} from "../controllers/watchlistController.js";

router.post("/", watchlist);
router.get("/getWatchlist/:id", getWatchlist);
router.delete("/deleteWatchlist/:id", deleteWatchlistMovie);

export default router;
