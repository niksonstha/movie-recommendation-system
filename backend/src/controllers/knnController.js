import { Rating } from "../models/ratingSchema.js";
import { dot, norm } from "mathjs";

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  const dotProduct = dot(vecA, vecB);
  const magnitudeA = norm(vecA);
  const magnitudeB = norm(vecB);
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

// Get the top K nearest neighbors
function getTopKNeighbors(ratingsMatrix, userIndex, k) {
  const similarities = [];
  const targetUserRatings = ratingsMatrix[userIndex];

  for (let i = 0; i < ratingsMatrix.length; i++) {
    if (i !== userIndex) {
      const similarity = cosineSimilarity(targetUserRatings, ratingsMatrix[i]);
      similarities.push({ userIndex: i, similarity });
    }
  }

  return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, k);
}

// Predict ratings for the target user
function predictRatings(ratingsMatrix, topKNeighbors, userIndex) {
  const numMovies = ratingsMatrix[0].length;
  const predictions = Array(numMovies).fill(0);
  const userRatings = ratingsMatrix[userIndex];

  for (let i = 0; i < numMovies; i++) {
    if (userRatings[i] === 0) {
      let weightedSum = 0;
      let similaritySum = 0;

      topKNeighbors.forEach(({ userIndex: neighborIndex, similarity }) => {
        const neighborRating = ratingsMatrix[neighborIndex][i];
        if (neighborRating !== 0) {
          weightedSum += similarity * neighborRating;
          similaritySum += similarity;
        }
      });

      predictions[i] = similaritySum === 0 ? 0 : weightedSum / similaritySum;
    }
  }

  return predictions;
}

// Generate recommendations for a specific user using KNN
async function knnRecommendationForUser(userId, k = 5) {
  const ratings = await Rating.find();

  const userIds = [...new Set(ratings.map((r) => r.userId.toString()))];
  const movieIds = [...new Set(ratings.map((r) => r.movieId))];

  let ratingMatrix = Array(userIds.length)
    .fill(0)
    .map(() => Array(movieIds.length).fill(0));

  ratings.forEach((r) => {
    const userIndex = userIds.indexOf(r.userId.toString());
    const movieIndex = movieIds.indexOf(r.movieId);
    ratingMatrix[userIndex][movieIndex] = r.rating;
  });

  const userIndex = userIds.indexOf(userId);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  const topKNeighbors = getTopKNeighbors(ratingMatrix, userIndex, k);
  const predictedRatings = predictRatings(
    ratingMatrix,
    topKNeighbors,
    userIndex
  );

  const recommendations = [];
  movieIds.forEach((movieId, index) => {
    if (ratingMatrix[userIndex][index] === 0) {
      const movieDetails = ratings.find((r) => r.movieId === movieId);

      recommendations.push({
        movieId,
        predictedRating: predictedRatings[index],
        movieName: movieDetails.movieName,
        release_date: movieDetails.release_date,
        runtime: movieDetails.runtime,
        poster_path: movieDetails.poster_path,
        genres: movieDetails.genres,
      });
    }
  });

  return recommendations
    .sort((a, b) => b.predictedRating - a.predictedRating)
    .slice(0, 5);
}

export const getKnnRecommendations = async (req, res) => {
  const userId = req.params.userId;

  try {
    const recommendations = await knnRecommendationForUser(userId);
    res.json({ recommendations });
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    res.status(500).send("Internal server error");
  }
};
