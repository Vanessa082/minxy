import { IUser } from "@/core/interface/user";
import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  clerkId: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

const User = models.User || model<IUser>('User', userSchema)

export default User;