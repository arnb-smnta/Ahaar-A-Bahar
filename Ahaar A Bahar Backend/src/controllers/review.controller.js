import { Fooditem } from "../models/fooditem.model.js";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
//**  1-5  STAR REVIEWS CANT BE DELETED BUT MODIFIED
export const createReview = asyncHandler(async (req, res) => {
  const { fooditem_id } = req.params;
  const fooditem = await Fooditem.findById(fooditem_id);
  const { rating } = req.body;
  if (!fooditem) {
    throw new ApiError(404, "Food item not found wrong food item id");
  }
  //check if the review is getting created double if true then redirect to update

  const oldreview = await Review.find({ owner: req.user._id });
  let reviewfound = null;

  if (oldreview) {
    const hasfooditem = oldreview.find((r) => r.fooditem === fooditem_id);
    if (hasfooditem) {
      reviewfound = hasfooditem;
    }
  }

  if (reviewfound) {
    res.redirect(
      `http://localhost:3000/api/v1/update-review/${reviewfound._id}`
    );
  }

  const review = await Review.create({
    star: rating,
    owner: req.user?.id,
    fooditem: fooditem_id,
  });
  const cretaedreview = await Review.findById(review._id);

  if (!cretaedreview) {
    throw new ApiError(500, "Review not created ");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { cretaedreview }, "Review is created succesfully")
    );
});
export const updateReview = asyncHandler(async (req, res) => {
  const { review_id } = req.params;
  const { rating } = req.body;
  const updatedReview = await Review.findByIdAndUpdate(
    review_id,
    {
      $set: { star: rating },
    },
    { new: true }
  );

  if (!updateReview) {
    throw new ApiError(500, "Review not updated internal server error");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { updateReview }, "Review updated succesfully ")
    );
});
