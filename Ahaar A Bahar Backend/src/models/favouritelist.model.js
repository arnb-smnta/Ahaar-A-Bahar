import mongoose, { Schema } from "mongoose";

const favouriteListSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: "Fooditem" }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const FavouriteList = new mongoose.model(
  "FavouriteList",
  favouriteListSchema
);
