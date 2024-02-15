import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import {
  createRestraunt,
  deleteRestraunt,
  getRestrauntDetails,
  toogleRestrauntIsOpen,
  updateRestrauntDetails,
} from "../controllers/restraunt.controller.js";

const router = Router();
router.route("/create-restraunt").post(jwtVerify, createRestraunt);
router
  .route("/R/:restraunt_id")
  .get(getRestrauntDetails)
  .delete(jwtVerify, deleteRestraunt)
  .patch(jwtVerify, updateRestrauntDetails);

router
  .route("/toggle-restaurantopenstatus")
  .post(jwtVerify, toogleRestrauntIsOpen);

export default router;
