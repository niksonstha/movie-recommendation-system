import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
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

export const Movie = mongoose.model("Movie", movieSchema);
