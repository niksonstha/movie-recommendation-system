import { Rating } from "../models/ratingSchema.js";

export const addRating = async (req, res) => {
  try {
    const { movieId, userId, rating } = req.body;
    console.log(req.body);

    // Check if the user has already rated this movie
    let ratingDoc = await Rating.findOne({ movieId, userId });

    if (ratingDoc) {
      // Update the existing rating
      ratingDoc.rating = rating;
      await ratingDoc.save();
    } else {
      // Create a new rating entry
      ratingDoc = await Rating.create({ movieId, userId, rating });
    }

    res.status(201).json(ratingDoc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add or update rating" });
  }
};

export const getUserRating = async (req, res) => {
  try {
    const { movieId, userId } = req.params;
    const ratingDoc = await Rating.findOne({ movieId, userId });

    if (ratingDoc) {
      res.status(200).json(ratingDoc);
    } else {
      res.status(404).json({ message: "Rating not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch user rating" });
  }
};
