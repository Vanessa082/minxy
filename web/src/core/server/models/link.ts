import { InferRawDocType, model, Schema } from "mongoose";

const schemaDefinition = {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    default: "",
  },
  original: {
    type: String,
    require: true,
  },
  short: {
    type: String,
    require: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: ["active", "inactive"],
  },
  password: {
    type: String,
  },
} as const;

const linkSchema = new Schema(schemaDefinition, { timestamps: true });

export const Link = model("Link", linkSchema);

export type LinkDocument = InferRawDocType<typeof schemaDefinition>;
