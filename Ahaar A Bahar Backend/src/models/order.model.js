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
      name: String,
      mobileno: String,
      houseNo: String,
      street: String,
      landmark: String,
      city: String,
      country: String,
      postalcode: String,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
