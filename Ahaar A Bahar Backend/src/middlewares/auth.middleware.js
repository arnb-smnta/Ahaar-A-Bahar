import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { AccessTokenSecret } from "../utils/envFiles";

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
