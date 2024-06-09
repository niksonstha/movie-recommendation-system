import { MovieWatchlist } from "../models/movieWatchlistSchema.js";

const timeAwareRecommendations = async (userId) => {
  // Fetch user watchlist and all movies
  const userWatchlist = await MovieWatchlist.find({ userId });
  const allMovies = await MovieWatchlist.find();

  // Convert user watchlist to a set of movie IDs for quick lookup
  const userMovieIds = new Set(
    userWatchlist.map((movie) => movie._id.toString())
  );

  // Get the current date
  const now = new Date();

  // Time decay function
  const timeDecay = (date) => {
    const diff = (now - new Date(date)) / (1000 * 60 * 60 * 24); // Difference in days
    return 1 / (1 + diff); // Decay factor: more recent -> higher weight
  };

  // Compute weighted scores for each movie
  const movieScores = allMovies.reduce((acc, movie) => {
    if (!userMovieIds.has(movie._id.toString())) {
      if (!acc[movie._id]) {
        acc[movie._id] = { movie, score: 0 };
      }
      acc[movie._id].score += timeDecay(movie.addedDate);
    }
    return acc;
  }, {});

  // Sort movies by their scores
  const sortedMovies = Object.values(movieScores).sort(
    (a, b) => b.score - a.score
  );

  // Return the top 10 movies
  return sortedMovies.slice(0, 10).map((item) => item.movie);
};

// Usage
export const getTimeAwareRecommendations = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

  try {
    const recommendations = await timeAwareRecommendations(userId);
    res.json(recommendations);
  } catch (error) {
    console.error("Failed to get recommendations", error);
    res.status(500).json({ message: "Failed to get recommendations" });
  }
};
