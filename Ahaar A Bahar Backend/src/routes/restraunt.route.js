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
  .route("/create-restraunt") //checked postman
  .post(jwtVerify, multerupload.array("photos", 5), createRestraunt);
router
  .route("/R/:restraunt_id")
  .get(getRestrauntDetails) //checked
  .delete(jwtVerify, deleteRestraunt) //checked postman
  .patch(jwtVerify, updateRestrauntDetails) //checked postman
  .post(multerupload.array("photos", 5), restrauntPhotos); //checked

router
  .route("/toggle-restaurantopenstatus/:restraunt_id")
  .post(jwtVerify, toogleRestrauntIsOpen); //checked postman

export default router;
