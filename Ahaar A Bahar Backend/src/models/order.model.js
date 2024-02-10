import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Fooditem",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    restraunt: {
      type: Schema.Types.ObjectId,
      ref: "Restraunt",
    },
    total: {
      type: number,
    },
    address: {
      type: String,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
