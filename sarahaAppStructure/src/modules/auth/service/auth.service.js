import * as dotenv from "dotenv";
dotenv.config({});
import user from "../../../DB/models/User.model.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import main from "../../../utiltes/sendEmail.js";

export const newuser = async (req, res) => {
  const { name, email, password, repassword, phone } = req.body;

  if (password != repassword) {
    return res
      .status(400)
      .json({ message: "password and repassword not match " });
  }

  if (await user.findOne({ email: email })) {
    return res.status(409).json({ message: "this email arady used " });
  }
  let secretKey = process.env.KEY;

  let hashedpassword = bcrypt.hashSync(password, 8);

  const encryptedPhoneNumber = CryptoJS.AES.encrypt(
    phone,
    secretKey
  ).toString();

  let newuser = await user.create({
    name,
    email,
    password: hashedpassword,
    phone: encryptedPhoneNumber,
  });

  let token = jwt.sign({ email }, secretKey);

  let url = `${req.protocol}://${req.host}:${process.env.PORT}/auth/veryfy/${token}`;

  console.log(url);

  main(email, url).catch(console.error);

  let objuser = newuser.toObject();
  delete objuser.password;

  res.status(200).json({ message: "sucess", objuser });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  let theuser = await user.findOne({ email: email });

  if (!theuser) {
    return res.status(404).json({ message: "invalid email" });
  }

  let result = bcrypt.compareSync(password, theuser.password);

  if (!result) {
    return res.status(404).json({ message: "invalid password " });
  }

  const token = jwt.sign(
    { userId: theuser._id, isLoggedIn: true },
    "incoding",
    {
      expiresIn: "10h",
    }
  );

  res.status(200).json({ message: "welcomeback", token });
};

export const verfy = async (req, res) => {
  try {
    const { token } = req.params;
    let decoded = jwt.verify(token, process.env.KEY);
    let userr = await user.findOne({ email: decoded.email });
    if (!userr) return res.status(404).json({ message: "email not found" });

    await user.findByIdAndUpdate(
      userr._id,
      { comfirmEmail: true },
      { new: true }
    );
  } catch (error) {}

  res.status(200).json({ message: "email comfermed" }, userr);
};
