import { UserRatings } from "../models"; // Assuming UserRatings is a collection of user ratings
import { create, all } from "mathjs";

const math = create(all);

const fetchInteractionMatrix = async () => {
  // Fetch user ratings from the database
  const userRatings = await UserRatings.find();

  // Get unique user IDs and movie IDs
  const userIds = [...new Set(userRatings.map((r) => r.userId.toString()))];
  const movieIds = [...new Set(userRatings.map((r) => r.movieId.toString()))];

  // Create a user-item interaction matrix
  const interactionMatrix = math.zeros([userIds.length, movieIds.length]);

  userRatings.forEach((rating) => {
    const userIndex = userIds.indexOf(rating.userId.toString());
    const movieIndex = movieIds.indexOf(rating.movieId.toString());
    interactionMatrix.set([userIndex, movieIndex], rating.rating);
  });

  return { interactionMatrix, userIds, movieIds };
};

const performSVD = (interactionMatrix) => {
  const { U, S, V } = math.svd(interactionMatrix);

  // Keep only top k singular values
  const k = 10; // Adjust k based on your needs
  const Uk = U.subset(math.index(math.range(0, U.size()[0]), math.range(0, k)));
  const Sk = S.subset(math.index(math.range(0, k), math.range(0, k)));
  const Vk = V.subset(math.index(math.range(0, k), math.range(0, V.size()[1])));

  return { Uk, Sk, Vk };
};

const generateRecommendations = (Uk, Sk, Vk, userIndex) => {
  const userVector = Uk.subset(
    math.index(userIndex, math.range(0, Uk.size()[1]))
  );
  const predictedRatings = userVector.multiply(Sk).multiply(Vk);

  return predictedRatings;
};

// Main function to get recommendations
const matrixFactorizationRecommendations = async (userId) => {
  const { interactionMatrix, userIds, movieIds } =
    await fetchInteractionMatrix();

  const { Uk, Sk, Vk } = performSVD(interactionMatrix);

  const userIndex = userIds.indexOf(userId);
  const predictedRatings = generateRecommendations(Uk, Sk, Vk, userIndex);

  // Convert predicted ratings to a list of movie recommendations
  const movieScores = predictedRatings.toArray().map((score, index) => ({
    movieId: movieIds[index],
    score,
  }));

  // Sort and return the top 5 recommended movies
  const recommendedMovies = movieScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return recommendedMovies.map((item) => item.movieId);
};

// Usage
export const getMatrixFactorizationRecommendations = async (req, res) => {
  const userId = req.params.userId;

  try {
    const recommendations = await matrixFactorizationRecommendations(userId);
    res.json(recommendations);
  } catch (error) {
    console.error("Failed to get recommendations", error);
    res.status(500).json({ message: "Failed to get recommendations" });
  }
};
