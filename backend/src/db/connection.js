import "dotenv/config";
import mongoose from "mongoose";

export const connection = () => {
  return mongoose.connect(process.env.DB_URL, {
    dbName: "moviedb",
  });
};
