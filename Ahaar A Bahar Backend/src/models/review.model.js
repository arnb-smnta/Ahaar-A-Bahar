import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    star: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fooditem: {
      type: Schema.Types.ObjectId,
      ref: "Fooditem",
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
