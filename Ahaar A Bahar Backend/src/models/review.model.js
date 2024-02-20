import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    star: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fooditem: {
      type: Schema.Types.ObjectId,
      ref: "Fooditem",
      required: true,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
