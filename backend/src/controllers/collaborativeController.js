import { Rating } from "../models/ratingSchema.js";
import { MovieWatchlist } from "../models/movieWatchlistSchema.js";

export const collaborativeRecommend = async (req, res) => {
  const userId = parseInt(req.query.user_id);

  const allRatings = await Rating.find();
  const userItemMatrix = {};
  allRatings.forEach((rating) => {
    if (!userItemMatrix[rating.userId]) {
      userItemMatrix[rating.userId] = {};
    }
    userItemMatrix[rating.userId][rating.movieId] = rating.rating;
  });

  const similarity = {};
  const targetUserRatings = userItemMatrix[userId];
  for (const user in userItemMatrix) {
    if (user == userId) continue;
    let commonRatings = 0;
    let sumTarget = 0;
    let sumUser = 0;
    let sumTargetSquare = 0;
    let sumUserSquare = 0;
    let sumProduct = 0;
    for (const movie in targetUserRatings) {
      if (userItemMatrix[user][movie]) {
        commonRatings++;
        const targetRating = targetUserRatings[movie];
        const userRating = userItemMatrix[user][movie];
        sumTarget += targetRating;
        sumUser += userRating;
        sumTargetSquare += targetRating * targetRating;
        sumUserSquare += userRating * userRating;
        sumProduct += targetRating * userRating;
      }
    }
    if (commonRatings > 0) {
      const numerator = commonRatings * sumProduct - sumTarget * sumUser;
      const denominator =
        Math.sqrt(commonRatings * sumTargetSquare - sumTarget * sumTarget) *
        Math.sqrt(commonRatings * sumUserSquare - sumUser * sumUser);
      similarity[user] = numerator / denominator;
    }
  }

  const recommendedMovies = {};
  for (const similarUser in similarity) {
    if (similarity[similarUser] > 0) {
      const similarUserRatings = userItemMatrix[similarUser];
      for (const movie in similarUserRatings) {
        if (!targetUserRatings[movie]) {
          if (!recommendedMovies[movie]) {
            recommendedMovies[movie] = 0;
          }
          recommendedMovies[movie] +=
            similarUserRatings[movie] * similarity[similarUser];
        }
      }
    }
  }

  const sortedRecommendations = Object.keys(recommendedMovies).sort(
    (a, b) => recommendedMovies[b] - recommendedMovies[a]
  );
  const movieIds = sortedRecommendations
    .slice(0, 10)
    .map((id) => mongoose.Types.ObjectId(id));
  const recommendations = await Movie.find({ _id: { $in: movieIds } });

  res.json(recommendations);
};
