import { model, models, Schema } from "mongoose";

const linkSchema = new Schema({
  userId: {
    type: String,
    require: true
  },
  name: {
    type: String,
    default: ''
  },
  original: {
    type: String,
    require: true
  },
  short: {
    type: String,
    require: true,
    unique: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: ['active', 'inactive']
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

const Link = models.Link || model('Link', linkSchema)

export default Link