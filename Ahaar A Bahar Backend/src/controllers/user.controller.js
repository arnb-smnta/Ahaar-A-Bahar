import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
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
    throw new ApiError(
      400,
      "User with same username , email or password exists"
    );
  }
  if (!isStrongPassword(password)) {
    throw new ApiError(
      400,
      "Enter a strong password with atleast 1 special character and two Capital letters"
    );
  }
});
export const loginUser = asyncHandler(async (req, res) => {});
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
