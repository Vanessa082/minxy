import mongoose, { Document } from "mongoose";
import { User } from "../features/interfaces/user.type";
import { Schema } from "mongoose";

interface UserDocument extends Document, Omit<User, "id" | "confirmPassword"> {
  _id: string
}

const UserSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const UserModel = mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
