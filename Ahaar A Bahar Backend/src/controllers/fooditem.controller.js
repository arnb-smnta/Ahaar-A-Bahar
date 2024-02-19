import { Fooditem } from "../models/fooditem.model.js";
import { Restraunt } from "../models/restraunt.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

export const createFoodItem = asyncHandler(async (req, res) => {
  const { restraunt_id } = req.params;
  const { name, description, cuisine, price } = req.body;
  const restraunt = await Restraunt.findById(restraunt_id);
  if (!restraunt) {
    throw new ApiError(404, "Restraunt not found incorrect restraunt id");
  }

  if (!(name || description || cuisine || price)) {
    throw new ApiError(400, "All the fields are required");
  }

  if (restraunt.owner.toString() !== req.user._id) {
    throw new ApiError(401, "You ar not the owner of this restraunt");
  }
  //cloudinary handles the null case
  let imageurl = uploadOnCloudinary(req.file.path);

  const fooditem = await Fooditem.create({
    name,
    description,
    cuisine,
    price,
    photo: imageurl.url || "",
    restraunt: restraunt_id,
  });

  const item = await Fooditem.findById(fooditem._id);
  if (!item) {
    throw new ApiError(500, "Food Item not created");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, item, "food item successfully created"));
});
export const updateFoodItemDetails = asyncHandler(async (req, res) => {
  const { fooditem_id } = req.params;

  const { name, description, cuisine } = req.body;

  const fooditem = await Fooditem.findById(fooditem_id);

  if (!fooditem) {
    throw new ApiError(404, "Fooditem not found");
  }
  const restraunt = await Restraunt.findById(fooditem.restraunt);
  if (restraunt.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(
      401,
      "You are not authorised to update details of this fooditem"
    );
  }

  if (!(name && description && cuisine)) {
    throw new ApiError(400, "Modify something to update");
  }

  let updatedfields = {};
  if (name) {
    updatedfields.name = name;
  }
  if (description) {
    updatedfields.description = description;
  }
  if (cuisine) {
    updatedfields.cuisine = cuisine;
  }
  const updateditem = await Fooditem.findByIdAndUpdate(
    fooditem_id,
    {
      $set: { updatedfields },
    },
    { new: true }
  );

  if (!updateditem) {
    throw new ApiError(500, "Fooditem not created");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateditem, "fooditem updated succesfully"));
});
export const fooditemPriceupdate = asyncHandler(async (req, res) => {
  const { fooditem_id } = req.params;
  const { price } = req.body;
  if (!price) {
    throw new ApiError(400, "Enter the updated price");
  }
  const fooditem = await Fooditem.findById(fooditem_id);

  if (!fooditem) {
    throw new ApiError(404, "Fooditem not found");
  }
  const restraunt = await Restraunt.findById(fooditem.restraunt);
  if (restraunt.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(
      401,
      "You are not authorised to update details of this fooditem"
    );
  }

  const updateditem = await Fooditem.findByIdAndUpdate(
    fooditem_id,
    {
      $set: { price },
    },
    { new: true }
  );
  if (!updateditem) {
    throw new ApiError(500, "Problem in updating the price of item try again");
  }

  return res
    .status(200)
    .json(new ApiError(200, updateditem, "Price succesfully updated"));
});
export const updateFoodItemPhoto = asyncHandler(async (req, res) => {
  const { fooditem_id } = req.params;

  const fooditem = await Fooditem.findById(fooditem_id);

  if (!fooditem) {
    throw new ApiError(404, "Fooditem not found");
  }
  const restraunt = await Restraunt.findById(fooditem.restraunt);
  if (restraunt.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(
      401,
      "You are not authorised to update details of this fooditem"
    );
  }

  if (!req.file) {
    throw new ApiError(400, "Upload a photo for updation");
  }

  const photo = await uploadOnCloudinary(req.file?.path);

  const updateditem = await Fooditem.findByIdAndUpdate(
    fooditem_id,
    {
      $set: {
        photo: photo.url,
      },
    },
    { new: true }
  );

  if (!updateditem) {
    throw new ApiError(500, "Photo not uploaded");
  }

  await deleteOnCloudinary(fooditem.photo);

  return res
    .status(200)
    .json(new ApiResponse(200, updateditem, "photo updated succesfully"));
});
export const toggleisAvailable = asyncHandler(async (req, res) => {
  const { fooditem_id } = req.params;

  const fooditem = await Fooditem.findById(fooditem_id);

  if (!fooditem) {
    throw new ApiError(404, "Fooditem not found");
  }
  const restraunt = await Restraunt.findById(fooditem.restraunt);
  if (restraunt.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(
      401,
      "You are not authorised to update details of this fooditem"
    );
  }

  const updateditem = await Fooditem.findByIdAndUpdate(fooditem_id, {
    $set: { isAvailable: !fooditem.isAvailable },
  });
  if (!updateditem) {
    throw new ApiError(500, " is available not updated");
  }

  return res.status(new ApiResponse(200, updateditem, ""));
});
export const deleteFoodItem = asyncHandler(async (req, res) => {
  const { fooditem_id } = req.params;

  const fooditem = await Fooditem.findById(fooditem_id);

  if (!fooditem) {
    throw new ApiError(404, "Fooditem not found");
  }
  const restraunt = await Restraunt.findById(fooditem.restraunt);
  if (restraunt.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(
      401,
      "You are not authorised to update details of this fooditem"
    );
  }
  await Fooditem.findByIdAndDelete(fooditem_id);

  const deleteditem = await Fooditem.findById(fooditem_id);

  if (deleteditem) {
    throw new ApiError(500, "item not deleted");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Food item deleted succesfully"));
});
export const getFoodItemDetails = asyncHandler(async (req, res) => {
  const { fooditem_id } = req.params;

  const fooditem = await Fooditem.findById(fooditem_id); //!have to add pipelines for comments and reviews

  if (!fooditem) {
    throw new ApiError(404, "Fooditem not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, fooditem, "Food item details successfully"));
});
