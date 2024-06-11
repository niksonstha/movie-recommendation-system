import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: Number,
  },
  { timestamps: true }
);

export const Rating = mongoose.model("Rating", ratingSchema);
