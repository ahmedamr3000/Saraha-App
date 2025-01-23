import { Router } from "express";
import * as userService from "./service/user.service.js";

const userrouter = Router();

userrouter.put("/", userService.updateuser);

export default userrouter;
