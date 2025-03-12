import mongoose, { InferRawDocType, model, Schema } from "mongoose";
import type { BaseDocumentRead } from "./base";

const schemaDefinition = {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  clerkId: {
    type: String,
    required: true,
    unique: true,
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

const userSchema = new Schema(schemaDefinition, {
  timestamps: true,
  /**
   * Google on mongoose `toObject` and `toJSON` transform methods to better understand.
   * also checkout this article @see https://alexanderzeitler.com/articles/mongoose-tojson-toobject-transform-with-subdocuments/
   */
  toObject: {
    transform: function (doc, ret) {
      delete ret._id;

      ret.name = ret.name;
    },
  },
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;

      ret.name = ret.name;
    },
  },
});

/**
 * Was get the error `OverwriteModelError: Cannot overwrite 'User' model once compiled
 *
 * @see https://stackoverflow.com/a/43761258/21746512 on stack overflow
 */
export const UserModel = mongoose.models.User || model("User", userSchema);

export type UserDocument = BaseDocumentRead<
  InferRawDocType<typeof schemaDefinition>
>;
