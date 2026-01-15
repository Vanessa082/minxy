import mongoose, { Schema, model } from "mongoose";

const visitSchema = new Schema({
  urlId: { type: String, required: true, index: true },
  shortId: { type: String, required: true, index: true },
  visitorHash: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now, index: true },

  // Geography (#4)
  country: { type: String, default: "Unknown" },
  city: { type: String, default: "Unknown" },
  region: { type: String, default: "Unknown" },

  // Technology (#5)
  device: { type: String, enum: ["desktop", "mobile", "tablet"], default: "desktop" },
  browser: { type: String, default: "Unknown" },
  os: { type: String, default: "Unknown" },
  screen: { type: String, default: "Unknown" },

  // Source (#6)
  referrer: { type: String, default: "Direct" },
  utm_source: { type: String },
  utm_medium: { type: String },
  utm_campaign: { type: String },
  utm_content: { type: String },
  utm_term: { type: String },

  // Outcomes (#8)
  isConversion: { type: Boolean, default: false },

  // Health & Security (#9, #11)
  isBot: { type: Boolean, default: false },
  status: { type: Number, default: 200 }
}, { timestamps: true });

export const VisitModel = mongoose.models?.Visit || model("Visit", visitSchema);