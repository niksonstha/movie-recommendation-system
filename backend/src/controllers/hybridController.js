import { MovieWatchlist } from "../models/movieWatchlistSchema.js";

const collaborativeFilteringRecommendations = async (userId) => {
  const userWatchlist = await MovieWatchlist.find({ userId });
  const allUsers = await MovieWatchlist.find({ userId: { $ne: userId } });

  const similarities = allUsers.reduce((acc, movie) => {
    const commonMovies = userWatchlist.filter(
      (userMovie) => userMovie.id === movie.id
    ).length;

    if (commonMovies > 0) {
      if (!acc[movie.userId]) {
        acc[movie.userId] = { user: movie.userId, commonMovies: 0, movies: [] };
      }
      acc[movie.userId].commonMovies += commonMovies;
      acc[movie.userId].movies.push(movie);
    }

    return acc;
  }, {});

  const topSimilarUsers = Object.values(similarities)
    .sort((a, b) => b.commonMovies - a.commonMovies)
    .slice(0, 5);

  const recommendedMovies = new Set();
  topSimilarUsers.forEach((similarUser) => {
    similarUser.movies.forEach((movie) => {
      if (!userWatchlist.some((userMovie) => userMovie.id === movie._id)) {
        recommendedMovies.add(movie);
      }
    });
  });

  console.log(recommendedMovies);

  return Array.from(recommendedMovies);
};

const contentBasedRecommendations = async (userId) => {
  const userWatchlist = await MovieWatchlist.find({ userId });
  const allMovies = await MovieWatchlist.find({ userId: { $ne: userId } });

  const recommendedMovies = new Set();
  userWatchlist.forEach((movie) => {
    const similarMovies = allMovies.filter((m) => {
      return m.genres.some((genre) => movie.genres.includes(genre));
    });
    similarMovies.forEach((m) => recommendedMovies.add(m));
  });

  return Array.from(recommendedMovies);
};

const getHybridRecommendations = async (userId) => {
  const collaborativeRecommendations =
    await collaborativeFilteringRecommendations(userId);
  const contentRecommendations = await contentBasedRecommendations(userId);

  // console.log(collaborativeRecommendations);
  console.log(contentRecommendations);

  const combinedRecommendations = [
    ...collaborativeRecommendations,
    ...contentRecommendations,
  ];

  // Remove duplicate movies
  const uniqueRecommendations = [];
  const movieIds = new Set();

  combinedRecommendations.forEach((movie) => {
    if (!movieIds.has(movie.id)) {
      movieIds.add(movie.id);
      uniqueRecommendations.push(movie);
    }
  });

  return uniqueRecommendations.slice(0, 10); // Return top 10 unique recommendations
};

export const getRecommendations = async (req, res) => {
  const userId = req.params.userId;

  try {
    const recommendations = await getHybridRecommendations(userId);
    res.json(recommendations);
  } catch (error) {
    console.error("Failed to get recommendations", error);
    res.status(500).json({ message: "Failed to get recommendations" });
  }
};
