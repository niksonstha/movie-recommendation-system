import "dotenv/config";
import { connection } from "./db/connection.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import watchlistMoviesRoutes from "./routes/watchlistMoviesRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import hybridRoutes from "./routes/hybridRoutes.js";
import timeAwareRoutes from "./routes/timeAwareRoutes.js";

const app = express();

// ? Mongodb connection
connection()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((error) => {
    console.log(error);
  });
// ? Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// ? routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/watchList", watchlistMoviesRoutes);
app.use("/api/v1/rating", ratingRoutes);
app.use("/api/v1/recommendation", hybridRoutes);
app.use("/api/v1/recommendation", timeAwareRoutes);

// ? server start
app.listen(process.env.PORT, () => {
  console.log(`App is running in port https://localhost:${process.env.PORT}`);
});
