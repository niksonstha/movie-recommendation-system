const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  userId: Number,
  movieId: Number,
  rating: Number,
});

module.exports = mongoose.model("Rating", ratingSchema);
