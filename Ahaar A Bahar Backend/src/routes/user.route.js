import { Router } from "express";
import { multerupload } from "../middlewares/multer.midlleware.js";
import {
  deleteUser,
  forgotPassword,
  getCurrentUser,
  getUserCart,
  getUserOrderHistory,
  getUserRestrauntDetails,
  loginUser,
  logoutUser,
  refreshAccesToken,
  registerUser,
  updateForgotPassowrd,
  updateUserAvatar,
  updateUserPassword,
  verifyAccount,
} from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { getFavouriteList } from "../controllers/favouriteList.controller.js";

const router = Router();

router.route("/register").post(multerupload.single("avatar"), registerUser); //working
router.route("/verify/:token").get(verifyAccount); //working
router.route("/login").post(loginUser); //working
router.route("/logout").post(jwtVerify, logoutUser); //working
router.route("/refreshAccessToken").post(refreshAccesToken); // checked
router.route("/change-password").post(jwtVerify, updateUserPassword); //checked
router.route("/forgot-password").post(forgotPassword); //checked
router.route("/update-forgotPassword").post(updateForgotPassowrd); //checked
router
  .route("/update-avatar")
  .patch(jwtVerify, multerupload.single("avatar"), updateUserAvatar); //checked
router.route("/user-restraunt").get(jwtVerify, getUserRestrauntDetails);
router.route("/order-history").get(jwtVerify, getUserOrderHistory);
router.route("/delete").delete(jwtVerify, deleteUser); //checked
router.route("/current-user").get(jwtVerify, getCurrentUser); //checked
router.route("/get-usercart").get(jwtVerify, getUserCart);
router.route("/get-favouritelists").get(jwtVerify, getFavouriteList);

export default router;
