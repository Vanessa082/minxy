import { InferRawDocType, model, Schema } from "mongoose";

const schemaDefinition = {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  clerkId: {
    type: String,
<<<<<<< HEAD
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
} as const;

const userSchema = new Schema(schemaDefinition, { timestamps: true })

export const UserModel = model('User', userSchema)
=======
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
>>>>>>> 4d451c0 (build onboarding form changing the redirect route to app/onboarding)

export type UserDocument = InferRawDocType<typeof schemaDefinition>;
