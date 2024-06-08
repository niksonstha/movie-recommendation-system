import { MovieWatchlist } from "../models/movieWatchlistSchema.js";

// Add movie to watchlist
export const watchlist = async (req, res) => {
  try {
    const { id, userId, title, release_date, runtime, poster_path, genres } =
      req.body;

    // Check if the movie already exists in the watchlist for the same user
    const existingMovie = await MovieWatchlist.findOne({ id, userId });

    if (existingMovie) {
      return res.status(400).json({
        success: false,
        message: "Movie already in watchlist",
      });
    }

    // If movie does not exist for this user, create a new entry
    const result = await MovieWatchlist.create({
      id,
      userId,
      title,
      release_date,
      runtime,
      poster_path,
      genres,
    });

    res.status(200).json({
      success: true,
      message: "Movie added successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: "Movie already in watchlist",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An error occurred while adding the movie to the watchlist",
      });
    }
  }
};

// Get user watchlist
export const getWatchlist = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const userWatchlist = await MovieWatchlist.find({ userId });

    res.status(200).json({
      success: true,
      watchlist: userWatchlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the watchlist",
    });
  }
};

// Delete movie from watchlist
export const deleteWatchlistMovie = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the movie from the user's watchlist
    const result = await MovieWatchlist.findOneAndDelete({ _id: id });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Movie not found in watchlist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the movie from the watchlist",
    });
  }
};
