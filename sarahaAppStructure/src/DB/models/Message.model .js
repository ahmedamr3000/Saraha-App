import mongoose, { Types } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "This field is required"],
    },
    rsiverid: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "This field is required"],
      ref: "user",
    },
  },
  { timestamps: true }
);

const messagemodel = mongoose.model("ITIMessage", messageSchema);

export default messagemodel;
