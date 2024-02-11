import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware";
import {
  createOrder,
  toggleCancelOrder,
} from "../controllers/order.controller";

const router = Router();

router.route("/create-order").post(jwtVerify, createOrder);
router.route("/cancel-order/:order_id").post(jwtVerify, toggleCancelOrder);

export default router;
