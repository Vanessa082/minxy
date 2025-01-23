import { Schema } from "mongoose";
import { timeStamp } from "node:console";

const linkSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  originalLink: {
    type: String,
  },
  shortLink: {
    type: String
  },
  clicks: {
    type: Number
  },
  Status: {
    type: Boolean
  },

  createdAt: {
    type: timeStamp
  }
})