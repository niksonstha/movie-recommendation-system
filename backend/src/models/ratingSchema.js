import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    rating: Number,
  },
  { timestamps: true }
);

export const Rating = mongoose.model("Rating", ratingSchema);
