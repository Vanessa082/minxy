import { model, models, Schema } from "mongoose";

const linkSchema = new Schema({
  userId: {
    type: String,
    require: true
  },
  originalLink: {
    type: String,
    require: true
  },
  shortLink: {
    type: String,
    require: true,
    unique: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  Status: {
    type: Boolean
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

const Link = models.Link || model('Link', linkSchema)

export default Link