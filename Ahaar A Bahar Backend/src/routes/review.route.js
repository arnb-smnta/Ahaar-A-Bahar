import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware";
import { createReview, updateReview } from "../controllers/review.controller";

const router = Router();

router.route("/create-review").post(jwtVerify, createReview);

router.route("/update-review/:review_id").patch(jwtVerify, updateReview);

export default router;
