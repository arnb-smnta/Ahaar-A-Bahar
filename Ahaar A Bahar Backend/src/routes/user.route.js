import { Router } from "express";
import { multerupload } from "../middlewares/multer.midlleware";
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
} from "../controllers/user.controller";
import { jwtVerify } from "../middlewares/auth.middleware";
import { getFavouriteList } from "../controllers/favouriteList.controller";

const router = Router();

router.route("/register").post(multerupload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
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
