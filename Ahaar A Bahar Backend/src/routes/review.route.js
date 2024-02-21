import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import {
  createReview,
  updateReview,
} from "../controllers/review.controller.js";

const router = Router();

router
  .route("/create-review/:fooditem_id")
  .post(jwtVerify, createReview, updateReview);

//router.route("/update-review/:review_id").patch(jwtVerify, updateReview);

export default router;
