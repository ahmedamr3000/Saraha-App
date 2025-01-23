import { conection } from "./DB/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import userrouter from "./modules/user/user.controller.js";
import messagerouter from "./modules/message/message.controller.js";
import imgRouter from "./modules/uplodingImgs/uploding.js";

export const bootstrap = (app, express) => {
  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/user", userrouter);
  app.use("/message", messagerouter);
  app.use("/uploding", imgRouter);

  conection();
  app.all("*", (req, res) => {
    return res.status(404).json({ message: "this route not found" });
  });
};
