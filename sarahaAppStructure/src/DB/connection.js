import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({});

export const conection = (err, data) => {
  const url = process.env.DATABASE;
  mongoose.connect(url).then(() => {
    console.log("mongo is conected");
  });
};
