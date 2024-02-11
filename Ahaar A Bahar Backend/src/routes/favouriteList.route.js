import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware";
import {
  addItemsinFavouriteList,
  createFavouriteList,
  deleteFavouriteList,
  deleteItemsinFavouriteList,
  getFavouriteList,
  updateFavouriteListName,
} from "../controllers/favouriteList.controller";
const router = Router();
router.route("/create-favouritelist").post(jwtVerify, createFavouriteList);
router
  .route("/FL/:favouritelist_id")
  .delete(deleteFavouriteList)
  .patch(updateFavouriteListName)
  .get(getFavouriteList);
router
  .route("/modify-itemsinfavouritelist/:favouritelist_id/:fooditem_id")
  .post(addItemsinFavouriteList)
  .delete(deleteItemsinFavouriteList);

export default router;
