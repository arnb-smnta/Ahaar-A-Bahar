import mongoose, { Schema } from "mongoose";

const restrauntSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      enum: ["delhi", "kolkata", "bangalore", "hydrebad", "chennai"],
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    photos: [{ type: String }],
  },
  { timestamps: true }
);

export const Restraunt = mongoose.model("Restraunt", restrauntSchema);
