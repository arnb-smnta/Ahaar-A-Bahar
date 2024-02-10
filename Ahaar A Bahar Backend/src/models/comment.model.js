import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    fooditem: {
      type: Schema.Types.ObjectId,
      ref: "Fooditem",
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
