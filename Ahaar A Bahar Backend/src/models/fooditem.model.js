import mongoose, { Schema } from "mongoose";

const fooditemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      default: "",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restraunt: {
      type: Schema.Types.ObjectId,
      ref: "Restraunt",
      required: true,
    },
    cuisines: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

export const Fooditem = mongoose.model("Fooditem", fooditemSchema);
