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
    movieName: String,
    release_date: {
      type: String,
    },
    runtime: {
      type: String,
    },
    poster_path: {
      type: String,
      required: [true, "Title is required"],
    },
    genres: [
      {
        type: String,
        required: [true, "Genres is required"],
      },
    ],
  },
  { timestamps: true }
);

export const Rating = mongoose.model("Rating", ratingSchema);
