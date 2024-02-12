import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import {
  createFoodItem,
  deleteFoodItem,
  getFoodItemDetails,
  toggleisAvailable,
  updateFoodItemDetails,
  updateFoodItemPhoto,
} from "../controllers/fooditem.controller.js";
import { multerupload } from "../middlewares/multer.midlleware.js";

const router = Router();
router
  .route("create-fooditem/:restraunt_id")
  .post(multerupload.single("photo"), jwtVerify, createFoodItem);
router
  .route("FI/:fooditem_id")
  .get(getFoodItemDetails)
  .patch(updateFoodItemDetails)
  .delete(deleteFoodItem);
router
  .route("update-fooditem-photo/:fooditem_id")
  .patch(multerupload.single("photo"), updateFoodItemPhoto);
router.route("/toggleisfooditemavailable/:fooditem_id").post(toggleisAvailable);

export default router;
