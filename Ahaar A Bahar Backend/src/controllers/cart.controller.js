import { Cart } from "../models/cart.model.js";
import { Fooditem } from "../models/fooditem.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createCart = asyncHandler(async (req, res) => {
  const cart = await Cart.create({
    owner: req.user._id,
  });

  const createdCart = await Cart.findById(cart._id);

  if (!createdCart) {
    throw new ApiError(500, "Cart not created");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User cart created succesfully"));
});
export const addIteminCart = asyncHandler(async (req, res) => {
  const { item_id } = req.body;

  const cart = await Cart.findOne({ owner: req.user._id });
  const item = await Fooditem.findById(item_id);
  if (!cart) {
    throw new ApiError(500, "Create cart first");
  }
  if (!item) {
    throw new ApiError(404, "Item not found invalid food item id");
  }

  if (cart.items.length === 0) {
    await Cart.findByIdAndUpdate(cart._id, {
      $set: { restraunt: item.restraunt },
    });
  }

  if (cart.restraunt !== item.restraunt) {
    throw new ApiError(
      400,
      "Restraunt changed old cart will be deleted and ncreate new cart "
    );
  }

  const updatedCart = await Cart.findByIdAndUpdate(
    cart._id,
    {
      $push: { items: item_id },
    },
    { new: true }
  );

  if (!updatedCart) {
    throw new ApiError(500, "Cart not updated");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Cart updated succesfully"));
});
export const deleteIteminCart = asyncHandler(async (req, res) => {
  const { item_id } = req.body;

  const cart = await Cart.findOne({ owner: req.user._id });
  const item = await Fooditem.findById(item_id);



  
});
export const updateCartOnRestrauntChange = asyncHandler(async (req, res) => {});
