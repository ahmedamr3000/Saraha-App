import * as dotenv from "dotenv";
import express from "express";
import { bootstrap } from "./src/app.controller.js";

dotenv.config({});
const app = express();

bootstrap(app, express);

app.listen(process.env.PORT, () => {
  console.log("Server is running... ");
});
