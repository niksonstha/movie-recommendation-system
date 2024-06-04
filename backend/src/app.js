import "dotenv/config";
import { connection } from "./db/connection.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import collaborativeRoutes from "./routes/collaborativeRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";

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
app.use("/api/v1/collaborative", collaborativeRoutes);
app.use("/api/v1/content", contentRoutes);

// ? server start
app.listen(process.env.PORT, () => {
  console.log(`App is running in port https://localhost:${process.env.PORT}`);
});
