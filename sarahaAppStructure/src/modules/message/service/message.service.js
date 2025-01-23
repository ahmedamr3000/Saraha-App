import * as dotenv from "dotenv";
dotenv.config({});
import messageModel from "../../../DB/models/Message.model .js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";

export const sendMessage = async (req, res) => {
  const { message, rsiverid } = req.body;

  let newuser = await messageModel.create({
    message,
    rsiverid,
  });

  res.status(200).json({ message: "sucess", newuser });
};

export const getMessages = async (req, res) => {
  const { rsiverid } = req.body;
  const messages = await messageModel.find({ rsiverid: rsiverid });

  try {
    if (messages.length === 0) {
      console.log("No messages found for this receiver ID.");
    } else {
      console.log("Messages for receiver ID:", rsiverid, messages);
    }
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    throw error;
  }
  res.status(200).json({ message: "welcomeback", messages });
};

export const deletmessage = async (req, res) => {
  try {
    const { messageid } = req.body;

    const { token } = req.headers;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is required." });
    }

    const decoded = jwt.verify(token, "incoding");

    const message = await messageModel.findById(messageid);

    if (!message) {
      return res.status(404).json({ message: "Message not found." });
    }

    if (decoded.userId !== message.rsiverid.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this message." });
    }

    await messageModel.findByIdAndDelete(messageid);

    res.status(200).json({ message: "Message deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
