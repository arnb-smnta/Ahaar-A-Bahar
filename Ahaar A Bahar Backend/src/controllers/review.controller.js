import { Fooditem } from "../models/fooditem.model.js";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createReview = asyncHandler(async (req, res, next) => {
  const { rating } = req.body;
  const { fooditem_id } = req.params;
  if (!rating) {
    throw new ApiError(400, "Enter a rating");
  }
  const fooditem = await Fooditem.findById(fooditem_id);

  if (!fooditem) {
    throw new ApiError(404, "Fooditem not found");
  }
  //checking if the review is getting updated or not

  const oldreviews = await Review.find({ owner: req.user?._id });
  let reviewFound;

  if (oldreviews) {
    const hasfooditem = oldreviews.find(
      (r) => r.fooditem.toString() === fooditem._id.toString()
    );

    if (hasfooditem) {
      reviewFound = hasfooditem;
    }
  }

  if (reviewFound) {
    req.reviewFound = reviewFound;
    next();
  } else {
    const review = await Review.create({
      star: rating,
      owner: req.user._id,
      fooditem: fooditem_id,
    });

    const createdreview = await Review.findById(review._id);

    if (!createdreview) {
      throw new ApiError(500, "Review not created");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, createdreview, "Review succesfully created"));
  }
});

export const updateReview = asyncHandler(async (req, res) => {
  console.log("in update", req);
  const { rating } = req.body;
  const updateReview = await Review.findByIdAndUpdate(
    req.reviewFound._id,
    {
      $set: { star: rating },
    },
    { new: true }
  );

  if (!updateReview) {
    throw new ApiError(500, "Internal server error review not updated");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateReview, "Review succesfully updated"));

  return res.json("update rveiew");
});
