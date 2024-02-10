import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    items: [{ type: Schema.Types.ObjectId, ref: "Fooditem" }],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      unique: true,
      required: true,
    },
    restraunt: {
      type: Schema.Types.ObjectId,
      ref: "Restraunt",
      unique: true,
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
