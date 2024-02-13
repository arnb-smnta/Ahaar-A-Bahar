import { Router } from "express";
import { multerupload } from "../middlewares/multer.midlleware.js";
import {
  deleteUser,
  getCurrentUser,
  getUserCart,
  getUserOrderHistory,
  getUserRestrauntDetails,
  loginUser,
  logoutUser,
  refreshAccesToken,
  registerUser,
  updateUserAvatar,
  updateUserPassword,
  verifyAccount,
} from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { getFavouriteList } from "../controllers/favouriteList.controller.js";

const router = Router();

router.route("/register").post(multerupload.single("avatar"), registerUser);
router.route("/verify/:token").get(verifyAccount);
router.route("/login").post(loginUser);
router.route("/logout").post(jwtVerify, logoutUser);
router.route("/refreshAccessToken").post(refreshAccesToken);
router.route("/change-password").post(jwtVerify, updateUserPassword);
router
  .route("/update-avatar")
  .patch(jwtVerify, multerupload.single("avatar"), updateUserAvatar);
router.route("/R/:username").get(jwtVerify, getUserRestrauntDetails);
router.route("/order-history").get(jwtVerify, getUserOrderHistory);
router.route("/delete").delete(jwtVerify, deleteUser);
router.route("/current-user").get(jwtVerify, getCurrentUser);
router.route("/get-usercart").get(jwtVerify, getUserCart);
router.route("/get-favouritelists").get(jwtVerify, getFavouriteList);

export default router;
