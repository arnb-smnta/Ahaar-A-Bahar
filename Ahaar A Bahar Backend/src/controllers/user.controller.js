import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { email_pass, envport, nodemail_email } from "../utils/envFiles.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
const options = {
  httpOnly: true,
  secure: true,
};
const generateAccessandRefreshToken = async (_id) => {
  try {
    const user = await User.findById(_id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefereshToken();

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

const sendVerificationEmail = async (email, verificationtoken) => {
  //create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: `${nodemail_email}`,
      pass: `${email_pass}`,
    },
  });
  const mailoptions = {
    from: "Ahaar A Bahar", // sender address
    to: email, // list of receivers
    subject: "Email verufication of Ahaar A Bahar", // Subject line
    text: `Please Click the following link to verify your email -http://localhost:${envport}/api/v1/users/verify/${verificationtoken}`, // plain text body
  };

  //Send the mail

  try {
    await transporter.sendMail(mailoptions);
    console.log("Verification mail sent Succesfully");
  } catch (error) {
    throw new ApiError(500, `Verification mail not sent error : ${error}`);
  }
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
  const verificationToken = crypto.randomBytes(20).toString("hex");
  try {
    await sendVerificationEmail(email, verificationToken);
  } catch (error) {
    throw new ApiError(
      500,
      "User verification mail not sent hence unregisterd"
    );
  }
  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    mobile,
    avatar: avatar || "",
    password,
    verificationToken,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -verificationToken"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "internal Server Error something went wrong while creating user"
    );
  }

  //Sending verification email to user via node mailer

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered succesfully"));
});
export const loginUser = asyncHandler(async (req, res) => {
  const { email, username, mobile, password } = req.body;

  if (!email && !username && !mobile) {
    throw new ApiError(400, "Atleast provide one unique field to login");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }, { mobile }],
  });

  if (!user) {
    throw new ApiError(401, "Invalid login credentials user does not exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
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
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User succesfully logged in"
      )
    );
});

export const verifyAccount = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.verified = true;
  user.verificationToken = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, {}, "EmailVerified Succesfully"));
});
export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, //removes the field from the document
      },
    },
    {
      new: true, //this method returns the new user object
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Succesfully logged out"));
});
export const updateUserAvatar = asyncHandler(async (req, res) => {});
export const updateUserPassword = asyncHandler(async (req, res) => {});
export const getUserRestrauntDetails = asyncHandler(async (req, res) => {});
export const deleteUser = asyncHandler(async (req, res) => {});
export const refreshAccesToken = asyncHandler(async (req, res) => {});
export const getCurrentUser = asyncHandler(async (req, res) => {});
export const getUserOrderHistory = asyncHandler(async (req, res) => {});
export const getUserCart = asyncHandler(async (req, res) => {});
export const getUserFavouriteLists = asyncHandler(async (req, res) => {});
