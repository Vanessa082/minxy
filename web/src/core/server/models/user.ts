import { InferRawDocType, model, Schema } from "mongoose";

const schemaDefinition = {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
} as const;

const userSchema = new Schema(schemaDefinition, { timestamps: true });

export const UserModel = model("User", userSchema);

export type UserDocument = InferRawDocType<typeof schemaDefinition>;
