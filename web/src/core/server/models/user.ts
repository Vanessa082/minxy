import { User } from "@/core/interface/user";
import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  clerkId: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
}, { timestamps: true })

const UserModel = models.User || model<User>('User', userSchema)

export default UserModel;