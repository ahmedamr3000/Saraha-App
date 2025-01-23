import { Router } from "express";
import * as auth from "./service/auth.service.js";
import { valdation } from "../../utiltes/valdation.js";
import { loginValdation, signupValdation } from "./auth.valdation.js";

const authRouter = Router();

authRouter.post("/signup", valdation(signupValdation), auth.newuser);
authRouter.post("/login", valdation(loginValdation), auth.login);
authRouter.get("/veryfy/:token", auth.verfy);

export default authRouter;
