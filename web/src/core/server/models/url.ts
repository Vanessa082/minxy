import mongoose, { InferRawDocType, model, Schema } from "mongoose";
import type { BaseDocumentRead } from "./base";

export enum UrlStatus {
  active = "active",
  inactive = "inactive",
}

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
  shortId: {
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
    enum: Object.values(UrlStatus),
    default: UrlStatus.active,
  },
  password: {
    type: String,
    default: "",
  },
  deletedAt: {
    type: Date,
    required: false,
    nullable: true,
    default: null,
  },
} as const;

const urlSchema = new Schema(schemaDefinition, {
  timestamps: true,
  toObject: {
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
});

export const UrlModel = mongoose.models?.URL || model("URL", urlSchema);

export type UrlDocument = BaseDocumentRead<
  InferRawDocType<typeof schemaDefinition>
>;
