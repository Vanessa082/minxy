import { InferRawDocType, model, Schema } from "mongoose";

const schemaDefinition = {
  id: {
    type: String,
    required: true,
<<<<<<< HEAD
    unique: true
  },
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
=======
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
>>>>>>> 4d451c0 (build onboarding form changing the redirect route to app/onboarding)
  },
  short: {
    type: String,
    require: true,
<<<<<<< HEAD
    unique: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: ['active', 'inactive']
=======
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: ["active", "inactive"],
>>>>>>> 4d451c0 (build onboarding form changing the redirect route to app/onboarding)
  },
  password: {
    type: String,
  },
} as const;

const linkSchema = new Schema(schemaDefinition, { timestamps: true });

<<<<<<< HEAD
export const Link = model('Link', linkSchema);

export type LinkDocument = InferRawDocType<typeof schemaDefinition>
=======
export const Link = model("Link", linkSchema);

export type LinkDocument = InferRawDocType<typeof schemaDefinition>;
>>>>>>> 4d451c0 (build onboarding form changing the redirect route to app/onboarding)
