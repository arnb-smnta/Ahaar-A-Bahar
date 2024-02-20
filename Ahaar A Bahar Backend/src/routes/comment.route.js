import { Router } from "express";

import {
  createComment,
  createReply,
  deleteComment,
  getComment,
  updateComment,
} from "../controllers/comment.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/create-comment/:fooditem_id").post(jwtVerify, createComment);

router
  .route("/c/:comment_id")
  .delete(jwtVerify, deleteComment)
  .patch(jwtVerify, updateComment)
  .get(getComment)
  .post(jwtVerify, createReply);

export default router;
