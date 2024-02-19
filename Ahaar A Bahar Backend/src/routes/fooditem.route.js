import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import {
  createFoodItem,
  deleteFoodItem,
  fooditemPriceupdate,
  getFoodItemDetails,
  toggleisAvailable,
  updateFoodItemDetails,
  updateFoodItemPhoto,
} from "../controllers/fooditem.controller.js";
import { multerupload } from "../middlewares/multer.midlleware.js";

const router = Router();
router
  .route("create-fooditem/:restraunt_id")
  .post(jwtVerify, multerupload.single("photo"), createFoodItem);
router
  .route("FI/:fooditem_id")
  .get(getFoodItemDetails)
  .patch(jwtVerify, updateFoodItemDetails)
  .delete(jwtVerify, deleteFoodItem)
  .post(jwtVerify, fooditemPriceupdate);
router
  .route("update-fooditem-photo/:fooditem_id")
  .patch(jwtVerify, multerupload.single("photo"), updateFoodItemPhoto);
router
  .route("/toggleisfooditemavailable/:fooditem_id")
  .post(jwtVerify, toggleisAvailable);

export default router;
