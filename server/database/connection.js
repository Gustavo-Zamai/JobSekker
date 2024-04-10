import mongoose from "mongoose";
import validator from "validator";

export const conn = () => {
  mongoose
    .connect(process.env.MONGO_DB_URI, {
      dbName: "jobApplication",
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(`Error while connecting to database: ${err.message}`);
    });
};
