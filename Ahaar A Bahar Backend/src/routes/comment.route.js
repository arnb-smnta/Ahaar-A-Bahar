import { Router } from "express";

import {
  createComment,
  deleteComment,
  getFoodItemComments,
  updateComment,
} from "../controllers/comment.controller";

const router = Router();
router
  .route("/create-comment/:fooditem_id")
  .post(createComment)
  .get(getFoodItemComments);
router.route("/c/:comment_id").delete(deleteComment).patch(updateComment);

export default router;
