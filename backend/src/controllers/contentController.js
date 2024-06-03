import { Movie } from "../models/movieSchema.js";
import natural from "natural";
const TfIdf = natural.TfIdf;

export const contentRecommend = async (req, res) => {
  const movieId = parseInt(req.query.movie_id);

  // Get all movies
  const allMovies = await Movie.find();

  // Prepare the data for TF-IDF
  const documents = allMovies.map(
    (movie) => movie.title + " " + movie.genres.join(" ")
  );
  const tfidf = new TfIdf();
  documents.forEach((doc) => tfidf.addDocument(doc));

  // Find the index of the given movie
  const movieIndex = allMovies.findIndex((movie) => movie.movieId === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }

  // Calculate similarity scores
  const similarities = [];
  for (let i = 0; i < tfidf.documents.length; i++) {
    if (i !== movieIndex) {
      const similarity = tfidf.tfidfs[i].reduce((sum, tfidfScore, index) => {
        return sum + tfidf.tfidfs[movieIndex][index] * tfidfScore;
      }, 0);
      similarities.push({ index: i, similarity });
    }
  }

  // Sort by similarity
  similarities.sort((a, b) => b.similarity - a.similarity);

  // Get top 10 similar movies
  const topSimilarMovies = similarities
    .slice(0, 10)
    .map((item) => allMovies[item.index]);

  res.json(topSimilarMovies);
};
