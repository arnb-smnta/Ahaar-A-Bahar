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
  updateUserAvatar,
  updateUserPassword,
  verifyAccount,
} from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { getFavouriteList } from "../controllers/favouriteList.controller.js";

const router = Router();

router.route("/register").post(multerupload.single("avatar"), registerUser); //done
router.route("/verify/:token").get(verifyAccount); //done
router.route("/login").post(loginUser); //done
router.route("/logout").post(jwtVerify, logoutUser); //done
router.route("/refreshAccessToken").post(refreshAccesToken); //done
router.route("/change-password").post(jwtVerify, updateUserPassword); //done
router.route("/forgot-password").post(forgotPassword); //done
router.route("/update-forgotPassword").post(updateUserPassword); //done
router
  .route("/update-avatar")
  .patch(jwtVerify, multerupload.single("avatar"), updateUserAvatar); //done
router.route("/user-restraunt").get(jwtVerify, getUserRestrauntDetails);
router.route("/order-history").get(jwtVerify, getUserOrderHistory);
router.route("/delete").delete(jwtVerify, deleteUser); //done
router.route("/current-user").get(jwtVerify, getCurrentUser); //done
router.route("/get-usercart").get(jwtVerify, getUserCart);
router.route("/get-favouritelists").get(jwtVerify, getFavouriteList);

export default router;
