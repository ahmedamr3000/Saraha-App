import jwt from "jsonwebtoken";
import usermodel from "../../../DB/models/User.model.js";

export const updateuser = async (req, res) => {
  const { token } = req.headers;

  let decoded = jwt.verify(token, "incoding");

  let updateduser = await usermodel.findByIdAndUpdate(
    decoded.userId,
    { name: req.body.name },
    { new: true }
  );

  res.status(200).json({ message: "welcome", updateduser });
};
