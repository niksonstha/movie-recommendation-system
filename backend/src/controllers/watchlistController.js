import { MovieWatchlist } from "../models/movieWatchlistSchema.js";

export const watchlist = async (req, res) => {
  try {
    const { id, userId, title, poster_path, genres } = req.body;

    // Check if the movie already exists in the watchlist for the same user
    const existingMovie = await MovieWatchlist.findOne({ id, userId });

    if (existingMovie) {
      return res.status(400).json({
        success: false,
        message: "Movie already in watchlist",
      });
    }
    console.log(existingMovie);

    // If movie does not exist for this user, create a new entry
    const result = await MovieWatchlist.create({
      id,
      userId,
      title,
      poster_path,
      genres,
    });
    console.log(result);

    res.status(200).json({
      success: true,
      message: "Movie added successfully",
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: "Movie already in watchlist",
      });
    } else {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while adding the movie to the watchlist",
      });
    }
  }
};

export const getWatchlist = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const userWatchlist = await MovieWatchlist.find({ userId });
    if (!userWatchlist) {
      return res.status(404).json({
        success: false,
        message: "User not found or watchlist is empty",
      });
    }

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
