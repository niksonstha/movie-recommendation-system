const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const api = require("./routes/api");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", api);

mongoose.connect("mongodb://localhost:27017/moviedb");

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = app;
