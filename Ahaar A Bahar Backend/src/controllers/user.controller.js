import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const generateAccessandRefreshToken = async (_id) => {
  try {
    const user = await User.findById(_id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while generating new Access and refreshtoken ${error}`
    );
  }
};
const validemail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const isStrongPassword = (password) => {
  // At least 8 characters, at least 2 uppercase letters, and at least 1 special character
  const passwordRegex =
    /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

  return passwordRegex.test(password);
};
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullname, mobile, password } = req.body;

  //validations

  if (
    [fullname, email, username, mobile, password].some((s) => s?.trim() === "")
  ) {
    throw new ApiError(400, "All the fields are required");
  }

  if (!validemail(email)) {
    throw new ApiError(400, "Not a valid email");
  }

  const existeduser = await User.findOne({
    $or: [{ username }, { email }, { mobile }],
  });

  if (existeduser) {
    throw new ApiError(400, "User with same username , email or mobile exists");
  }
  if (!isStrongPassword(password)) {
    throw new ApiError(
      400,
      "Enter a strong password with atleast 1 special character and two Capital letters"
    );
  }
  let avatarimagelocalpath;

  if (
    req.files &&
    Array.isArray(req.files.avatarImage[0].path) &&
    req.files.avatarImage.length > 0
  ) {
    avatarimagelocalpath = req.files.avatarImage[0].path;
  }
  const avatar = await uploadOnCloudinary(avatarimagelocalpath);

  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    mobile,
    avatar: avatar || "",
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "internal Server Error something went wrong while creating user"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered succesfully"));
});
export const loginUser = asyncHandler(async (req, res) => {
  const { email, username, mobile, password } = req.body;

  if (!(email && username && mobile)) {
    throw new ApiError(400, "Atleast provide on unique field to login");
  }

  const user = User.findOne({
    $or: [{ username }, { email }, { mobile }],
  });

  if (!user) {
    throw new ApiError(401, "Invalid login credentials user does not exists");
  }

  const isPasswordValid = await user.isPasswordValid(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Wrong Password");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { loggedInUser }, "USer succesfully logged in"));
});
export const logoutUser = asyncHandler(async (req, res) => {});
export const updateUserAvatar = asyncHandler(async (req, res) => {});
export const updateUserPassword = asyncHandler(async (req, res) => {});
export const getUserRestrauntDetails = asyncHandler(async (req, res) => {});
export const deleteUser = asyncHandler(async (req, res) => {});
export const refreshAccesToken = asyncHandler(async (req, res) => {});
export const getCurrentUser = asyncHandler(async (req, res) => {});
export const getUserOrderHistory = asyncHandler(async (req, res) => {});
export const getUserCart = asyncHandler(async (req, res) => {});
export const getUserFavouriteLists = asyncHandler(async (req, res) => {});
