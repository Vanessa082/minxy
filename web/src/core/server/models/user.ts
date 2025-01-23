import { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
})

export default userSchema