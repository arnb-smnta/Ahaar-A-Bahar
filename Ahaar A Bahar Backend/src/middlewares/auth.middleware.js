import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AccessTokenSecret } from "../utils/envFiles.js";
import jwt from "jsonwebtoken";

export const jwtVerify = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorised access");
    }

    const decodedToken = jwt.verify(token, AccessTokenSecret);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refrshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Acces token");
    }

    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(401, `${err} Something went wrong in validation `);
  }
});
