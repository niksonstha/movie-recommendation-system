import { Rating } from "../models/ratingSchema.js";
import seedrandom from "seedrandom";

// Normalize the ratings matrix
function normalizeRatings(ratings) {
  let meanRatings = [];
  let normalizedRatings = [];

  for (let i = 0; i < ratings.length; i++) {
    let sum = 0;
    let count = 0;
    for (let j = 0; j < ratings[i].length; j++) {
      if (ratings[i][j] !== 0) {
        sum += ratings[i][j];
        count++;
      }
    }
    let mean = sum / count;
    meanRatings.push(mean);
    normalizedRatings.push(ratings[i].map((r) => (r === 0 ? 0 : r - mean)));
  }

  return { normalizedRatings, meanRatings };
}

// Approximate SVD (with gradient descent)
function approximateSVD(
  matrix,
  k,
  steps = 5000,
  alpha = 0.002,
  beta = 0.02,
  seed = 42
) {
  const rng = seedrandom(seed);
  const numUsers = matrix.length;
  const numMovies = matrix[0].length;

  let U = Array(numUsers)
    .fill(null)
    .map(() =>
      Array(k)
        .fill(0)
        .map(() => rng())
    );
  let V = Array(numMovies)
    .fill(null)
    .map(() =>
      Array(k)
        .fill(0)
        .map(() => rng())
    );

  for (let step = 0; step < steps; step++) {
    for (let i = 0; i < numUsers; i++) {
      for (let j = 0; j < numMovies; j++) {
        if (matrix[i][j] > 0) {
          let prediction = U[i].reduce((sum, uik, k) => sum + uik * V[j][k], 0);
          let error = matrix[i][j] - prediction;

          for (let k = 0; k < U[0].length; k++) {
            U[i][k] += alpha * (2 * error * V[j][k] - beta * U[i][k]);
            V[j][k] += alpha * (2 * error * U[i][k] - beta * V[j][k]);
          }
        }
      }
    }
  }

  return { U, V };
}

// Reconstruct the matrix
function reconstructMatrix(U, V, meanRatings) {
  let reconstructedMatrix = [];

  for (let i = 0; i < U.length; i++) {
    let row = [];
    for (let j = 0; j < V[0].length; j++) {
      let value = meanRatings[i];
      for (let k = 0; k < U[0].length; k++) {
        value += U[i][k] * V[j][k];
      }
      row.push(value);
    }
    reconstructedMatrix.push(row);
  }

  return reconstructedMatrix;
}

// Generate recommendations for a specific user using SVD
function svdRecommendationForUser(
  ratingMatrix,
  userIndex,
  movieIds,
  ratings,
  userIds
) {
  const k = 5; // Number of latent factors
  const genrePreferences = {}; // Store genre preferences for the user

  // Calculate genre preferences for the user based on their ratings
  ratings.forEach((r) => {
    if (r.userId.toString() === userIds[userIndex]) {
      r.genres.forEach((genre) => {
        genrePreferences[genre] = genrePreferences[genre]
          ? genrePreferences[genre] + r.rating
          : r.rating;
      });
    }
  });

  const { normalizedRatings, meanRatings } = normalizeRatings(ratingMatrix);
  const { U, V } = approximateSVD(normalizedRatings, k, 5000, 0.002, 0.02, 42);
  const predictedRatings = reconstructMatrix(U, V, meanRatings);

  const userRatings = predictedRatings[userIndex];
  const movieRecommendations = [];

  // Generate recommendations based on predicted ratings and genre preferences
  movieIds.forEach((movieId, index) => {
    const predictedRating = userRatings[index];
    const movie = ratings.find((r) => r.movieId === movieId);
    const movieGenres = movie.genres;

    // Adjust the predicted rating based on genre preferences
    let adjustedRating = predictedRating;
    movieGenres.forEach((genre) => {
      if (genrePreferences[genre]) {
        adjustedRating += genrePreferences[genre] * 0.1; // Adjust by a factor based on genre preference strength
      }
    });

    movieRecommendations.push({
      movieId,
      predictedRating: adjustedRating,
      title: movie.movieName,
      release_date: movie.release_date,
      runtime: movie.runtime,
      poster_path: movie.poster_path,
      genres: movie.genres,
    });
  });

  // Sort the recommendations by adjusted predicted rating
  const topNRecommendations = movieRecommendations
    .sort((a, b) => b.predictedRating - a.predictedRating)
    .slice(0, 5);

  return topNRecommendations;
}

// Fetch ratings from the database and process them
export const getMatrixFactorizationRecommendations = async (req, res) => {
  const userId = req.params.userId;

  try {
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
      return res.status(404).send("User not found");
    }

    const recommendations = svdRecommendationForUser(
      ratingMatrix,
      userIndex,
      movieIds,
      ratings,
      userIds
    );
    res.json({ recommendations });
  } catch (err) {
    console.error("Error fetching ratings:", err);
    res.status(500).send("Internal server error");
  }
};
