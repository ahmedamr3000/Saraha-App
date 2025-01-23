import { Router } from "express";
import * as messageService from "./service/message.service.js";
import {
  deletMessageValdation,
  getMessageByIdValdation,
  sendMessageValdation,
} from "./message.valdation.js";
import { valdation } from "../../utiltes/valdation.js";

const messageRouter = Router();

messageRouter.post(
  "/",
  valdation(sendMessageValdation),
  messageService.sendMessage
);
messageRouter.get(
  "/",
  valdation(getMessageByIdValdation),
  messageService.getMessages
);
messageRouter.delete(
  "/",
  valdation(deletMessageValdation),
  messageService.deletmessage
);

export default messageRouter;
