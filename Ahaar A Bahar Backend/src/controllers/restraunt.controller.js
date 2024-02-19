import { Restraunt } from "../models/restraunt.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createRestraunt = asyncHandler(async (req, res) => {
  const { name, description, address, city } = req.body;
  if (!(name || description || address || city)) {
    throw new ApiError(400, "All the field are required");
  }

  let restrauntimages;
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    restrauntimages = req.files;
  }
  let restrauntimagesurl = [];
  console.log(req.files);
  for (let i = 0; i < restrauntimages.length; i++) {
    const restrauntimgsurl = await uploadOnCloudinary(restrauntimages[i].path);
    restrauntimagesurl[i] = restrauntimgsurl.url;
  }

  const restraunt = await Restraunt.create({
    owner: req.user?._id,
    name: name,
    description: description,
    address: address,
    city: city,
    photos: restrauntimagesurl,
  });

  if (!restraunt) {
    throw new ApiError(
      500,
      "Something went wrong while creating new Restraunt"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, restraunt, "Restraunt created succesfully"));
});

export const deleteRestraunt = asyncHandler(async (req, res) => {
  const { restraunt_id } = req.params;

  const restraunt = await Restraunt.findById(restraunt_id);

  if (!restraunt) {
    throw new ApiError(400, "Invalid Restraunt Id");
  }

  if (restraunt.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(401, "You are not authorised to perform this action");
  }

  await Restraunt.findByIdAndDelete(restraunt_id);

  const updatedRestrauntdetails = await Restraunt.findById(restraunt_id);

  if (updatedRestrauntdetails) {
    throw new ApiError(
      500,
      "Something went wrong while deleting restraunt try again"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Restraunt Succesfully deleted"));
});

export const updateRestrauntDetails = asyncHandler(async (req, res) => {
  const { name, description, address, city } = req.body;
  const { restraunt_id } = req.params;
  if (!name && !description && !address && !city) {
    throw new ApiError(400, "Provide at least one parameter to change");
  }

  const restraunt = await Restraunt.findById(restraunt_id);

  if (!restraunt) {
    throw new ApiError(404, "Restarunt not found");
  }

  if (restraunt.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(
      401,
      "You are not authorised to change or update details of this restraunt"
    );
  }

  let updatedDataFields = {};

  if (name) {
    updatedDataFields.name = name;
  }
  if (description) {
    updatedDataFields.description = description;
  }
  if (address) {
    updatedDataFields.address = address;
  }
  if (city) {
    updatedDataFields.city = city;
  }

  const updatedRestraunt = await Restraunt.findByIdAndUpdate(
    { _id: restraunt_id },
    { $set: updatedDataFields },
    { new: true }
  );

  if (!updatedRestraunt) {
    throw new ApiError(
      500,
      "Something went wrong while updating restraunt details"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedRestraunt, "Restraunt succesfully updated")
    );
});
export const toogleRestrauntIsOpen = asyncHandler(async (req, res) => {
  const { restraunt_id } = req.params;

  const restraunt = await Restraunt.findById(restraunt_id);

  if (!restraunt) {
    throw new ApiError(404, "restraunt not found wrong Id");
  }
  console.log(req.user._id);
  console.log(restraunt.owner);

  if (!(req.user._id.toString() === restraunt.owner.toString())) {
    throw new ApiError(401, "You are not authorised ");
  }

  const updatedRestraunt = await Restraunt.findByIdAndUpdate(
    restraunt_id,
    {
      $set: {
        isOpen: !restraunt?.isOpen,
      },
    },
    { new: true }
  );

  if (!updatedRestraunt) {
    throw new ApiError(
      500,
      "Something went wrong while updating Restraunt open status try again"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedRestraunt,
        "Open status of restraunt updated succesfully"
      )
    );
});
export const getRestrauntDetails = asyncHandler(async (req, res) => {
  const { restraunt_id } = req.params;
  const restraunt = await Restraunt.findById(restraunt_id).select("-owner");

  if (!restraunt) {
    throw new ApiError(404, "restraunt not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, restraunt, "Succesfully fetched restraunt details")
    );
});

export const restrauntPhotos = asyncHandler(async (req, res) => {
  const { restraunt_id } = req.params;

  const restraunt = await Restraunt.findById(restraunt_id);
  if (!restraunt) {
    throw new ApiError(404, "Restraunt not found");
  }

  let restrauntimages;

  if (!req.files.length > 0) {
    throw new ApiError(400, "Atleast upload one photo to upload");
  }
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    restrauntimages = req.files;
  }
  let restrauntimagesurl = [];
  console.log(req.files);
  for (let i = 0; i < restrauntimages.length; i++) {
    const restrauntimgsurl = await uploadOnCloudinary(restrauntimages[i].path);
    restrauntimagesurl[i] = restrauntimgsurl.url;
  }

  const updatedRestraunt = await Restraunt.findByIdAndUpdate(
    { _id: restraunt_id },
    {
      $push: { photos: { $each: restrauntimagesurl } },
    },
    { new: true }
  ).select("-owner");

  if (!updatedRestraunt) {
    throw new ApiError(500, "Internal Server Error restraunt not updated");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedRestraunt, "Restraunt updated Succesfully")
    );
});
