import { Comment } from "../models/comment.model.js";
import { Fooditem } from "../models/fooditem.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createComment = asyncHandler(async (req, res) => {
  const { fooditem_id } = req.params;
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Comment is empty write something to post");
  }
  const fooditem = await Fooditem.findById(fooditem_id);
  if (!fooditem) {
    throw new ApiError(404, "Fooditem not found");
  }

  const comment = await Comment.create({
    owner: req.user?._id,
    content: content,
    fooditem: fooditem_id,
  });

  const createdcomment = await Comment.findById(comment?._id);

  if (!createdcomment) {
    throw new ApiError(500, "Comment not created something went wrong");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdcomment, "Comment succesfully created"));
});
export const createReply = asyncHandler(async (req, res) => {
  const { comment_id } = req.params;

  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Enter your reply to proceed");
  }
  const comment = await Comment.findById(comment_id);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  const reply = await Comment.create({
    owner: req.user._id,
    content,
    reply: comment_id,
  });

  const findReply = await Comment.findById(reply._id);
  if (!findReply) {
    throw new ApiError(500, "Internal server Error reply not created");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, findReply, "Reply succesfully created"));
});
export const deleteComment = asyncHandler(async (req, res) => {
  const { comment_id } = req.params;
  const comment = await Comment.findById(comment_id);

  if (!comment) {
    throw new ApiError(404, "Comment not found wrong comment id");
  }

  if (comment.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(
      401,
      "Unauthorised request not permitted to delte this comment"
    );
  }

  await Comment.findByIdAndDelete(comment_id); //!delete the replies also if present

  const deleteComment = await Comment.findById(comment_id);

  if (deleteComment) {
    throw new ApiError(500, "comment not deleted try again");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment succesfully deleted"));
});
export const updateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { comment_id } = req.params;

  if (!content) {
    throw new ApiError(400, "Enter some content to modify");
  }
  const comment = await Comment.findById(comment_id);
  if (!comment) {
    throw new ApiError(404, "Comment not found wrong comment id");
  }

  if (comment.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(
      401,
      "Unauthorised request not permitted to delte this comment"
    );
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    comment_id,
    {
      $set: { content: content },
    },
    { new: true }
  );

  if (!updatedComment) {
    throw new ApiError(
      500,
      "internal server error Comment not updated try again"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "comment succesfully updated"));
});
export const getComment = asyncHandler(async (req, res) => {
  const { comment_id } = req.params;
  const comment = await Comment.findById(comment_id);
  if (!comment) {
    throw new ApiError(404, "Comment not found wrong comment id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment fetched succesfully"));
});
