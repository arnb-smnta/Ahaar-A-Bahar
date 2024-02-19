import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import {
  createRestraunt,
  deleteRestraunt,
  getRestrauntDetails,
  restrauntPhotos,
  toogleRestrauntIsOpen,
  updateRestrauntDetails,
} from "../controllers/restraunt.controller.js";
import { multerupload } from "../middlewares/multer.midlleware.js";

const router = Router();
router
  .route("/create-restraunt") //checked
  .post(jwtVerify, multerupload.array("photos", 5), createRestraunt);
router
  .route("/R/:restraunt_id")
  .get(getRestrauntDetails) //checked
  .delete(jwtVerify, deleteRestraunt) //checked
  .patch(jwtVerify, updateRestrauntDetails) //checked
  .post(multerupload.array("photos", 5), restrauntPhotos); //checked

router
  .route("/toggle-restaurantopenstatus/:restraunt_id")
  .post(jwtVerify, toogleRestrauntIsOpen); //checked

export default router;
