import nodemailer from "nodemailer";
import { template } from "./emailTemplet.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: "ahmedamro3000@gmail.com",
    pass: "uhdv eeoq ppwp dxqx",
  },
});

async function main(email, url) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "ahmmmed@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: template(url),
  });

  console.log("Message sent: %s", info.messageId);
}

export default main;
