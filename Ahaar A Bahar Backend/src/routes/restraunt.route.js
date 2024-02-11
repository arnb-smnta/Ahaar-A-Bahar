import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware";
import {
  createRestraunt,
  deleteRestraunt,
  getRestrauntDetails,
  toogleRestrauntIsOpen,
  updateRestrauntDetails,
} from "../controllers/restraunt.controller";

const router = Router();
router.route("/create-restraunt").post(jwtVerify, createRestraunt);
router
  .route("/R/:restraunt_id")
  .get(getRestrauntDetails)
  .delete(deleteRestraunt)
  .patch(updateRestrauntDetails);

router
  .route("/toggle-restaurantopenstatus")
  .post(jwtVerify, toogleRestrauntIsOpen);

export default router;
