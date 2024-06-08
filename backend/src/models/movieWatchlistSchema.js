import mongoose from "mongoose";

const MovieWatchlistSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "Movie ID is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
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

export const MovieWatchlist = mongoose.model(
  "MovieWatchlist",
  MovieWatchlistSchema
);
