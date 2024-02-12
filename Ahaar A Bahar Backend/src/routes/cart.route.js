import { Router } from "express";
import {
  addIteminCart,
  createCart,
  deleteIteminCart,
  updateCartOnRestrauntChange,
} from "../controllers/cart.controller.js";

const router = Router();
router.route("/create-cart").post(createCart);
router
  .route("/Cart/:cart_id/:restraunt_id")
  .post(addIteminCart)
  .delete(deleteIteminCart);
router
  .route("/delete-cartitems/:restraunt_id")
  .delete(updateCartOnRestrauntChange);
export default router;
