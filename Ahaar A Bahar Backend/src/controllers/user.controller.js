import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import {
  RefreshTokenSecret,
  email_pass,
  envport,
  nodemail_email,
} from "../utils/envFiles.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

import mongoose from "mongoose";
import { Cart } from "../models/cart.model.js";
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
    subject: "Email verification of Ahaar A Bahar", // Subject line
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

const forgotPasswordValidation = async (forgotPasswordToken, email) => {
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
    text: `Your otp for forgotten Password is -${forgotPasswordToken}`, // plain text body
  };

  //Send the mail

  try {
    await transporter.sendMail(mailoptions);
    console.log("Verification mail sent Succesfully");
  } catch (error) {
    throw new ApiError(500, `Password forgot otp not sent retry: ${error}`);
  }
};
const sendNewPasswordtoUser = async (password, email) => {
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
    text: `Your new password is -${password}`, // plain text body
  };

  //Send the mail

  try {
    await transporter.sendMail(mailoptions);
    console.log("New generated Password sent Succesfully");
  } catch (error) {
    throw new ApiError(500, `New generated Password not sent retry: ${error}`);
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullname, mobile, password } = req.body;

  //validations

  let avatarimagelocalpath = req.file?.path;
  console.log(req.file);
  if (
    [fullname, email, username, mobile, password].some((s) => s?.trim() === "")
  ) {
    fs.unlinkSync(avatarimagelocalpath);
    throw new ApiError(400, "All the fields are required");
  }

  if (!validemail(email)) {
    fs.unlinkSync(avatarimagelocalpath);
    throw new ApiError(400, "Not a valid email");
  }

  const existeduser = await User.findOne({
    $or: [{ username }, { email }, { mobile }],
  });

  if (existeduser) {
    fs.unlinkSync(avatarimagelocalpath);
    throw new ApiError(400, "User with same username , email or mobile exists");
  }

  if (!isStrongPassword(password)) {
    fs.unlinkSync(avatarimagelocalpath);
    throw new ApiError(
      400,
      "Enter a strong password with atleast 1 special character and two Capital letters"
    );
  }

  /*if (
    req.files &&
    Array.isArray(req.files.avatarImage[0].path) &&
    req.files.avatarImage.length > 0
  ) {
    avatarimagelocalpath = req.files.avatarImage[0].path;
  }*/

  /*if (true) {
    throw new ApiError(400, "physical error");
  }*/
  const avatar = await uploadOnCloudinary(req.file?.path);
  console.log(avatar);
  const verificationToken = crypto.randomBytes(20).toString("hex");

  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    mobile,
    avatar: avatar?.url || "",
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
  try {
    await sendVerificationEmail(email, verificationToken);
  } catch (error) {
    throw new ApiError(
      500,
      "User verification mail not sent hence unregisterd"
    );
  }
  //Sending verification email to user via node mailer

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered succesfully"));
});
export const loginUser = asyncHandler(async (req, res) => {
  const { email, username, mobile, password } = req.body;
  console.log(req.body);
  if (!email && !username && !mobile) {
    throw new ApiError(400, "Atleast provide one unique field to login");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }, { mobile }],
  });
  console.log(user);
  if (!user) {
    throw new ApiError(401, "Invalid login credentials user does not exists");
  }
  if (!user.verified) {
    throw new ApiError(
      400,
      "You have not verified your email address please verify and re-login "
    );
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
export const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarimagelocalpath = req.file?.path;
  if (!avatarimagelocalpath) {
    throw new ApiError(400, "Upload an picture to changeor modify");
  }

  const avatar = uploadOnCloudinary(avatarimagelocalpath);

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Avatar succesfully updated"));
});
export const updateForgotPassowrd = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const user = await User.findOne({ forgotPasswordToken: otp });
  if (!user) {
    throw new ApiError(400, "Wrong otp please enter correct otp");
  }
  if (user.isPasswordForgot) {
    user.isPasswordForgot = false;
    user.forgotPasswordToken = undefined;

    user.password = crypto.randomBytes(20).toString("hex");
    sendNewPasswordtoUser(user.password, user.email);

    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {},
          "New Password generated succesfully sent to email"
        )
      );
  }
});
export const updateUserPassword = asyncHandler(
  async (req, res) => {
    //conditions to update password
    //Forgot password or change password
    //1st case change password

    const { oldPassword, newPassword, confPassword } = req.body;
    if (!newPassword === confPassword) {
      throw new ApiError(
        400,
        "New password is not equal to confirmed Password"
      );
    }

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Old password is not correct");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password is succesfully updated"));
  }
  //2nd case forgot password
);

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Enter your email to proceed");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User with following email does not exists");
  }
  user.isPasswordForgot = true;
  user.forgotPasswordToken = crypto.randomBytes(20).toString("hex");

  user.save({ validateBeforeSave: false });

  forgotPasswordValidation(user.forgotPasswordToken, email);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Otp sent to email succesfully"));
});

export const getUserRestrauntDetails = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "restraunts",
        localField: "owner",
        foreignField: "_id",
        as: "Restraunts",
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].Restraunts,
        "User Restarunts fetched Succesfully"
      )
    );
});
export const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user?._id);
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Succesfully deleted"));
}); //! has to delete users restraunts and the restraunts food items and food items reviews comments and also the user orders cart
export const refreshAccesToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
    console.log(incomingRefreshToken);

    console.log(req.cookies);
    if (!incomingRefreshToken) {
      throw new ApiError(400, "Invalid refresh token");
    }

    const decodedToken = jwt.verify(incomingRefreshToken, RefreshTokenSecret);
    console.log(decodedToken);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(400, "invalid refresh token");
    }

    console.log(user.refreshToken);

    if (user?.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Refresh token expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(
      user.id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, {}, "new Access token generated"));
  } catch (error) {
    throw new ApiError(500, `Problem in generating refresh token${error}`);
  }
});
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User details fetched succesfully"));
});
export const getUserOrderHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: mongoose.Types.ObjectId(req._id),
    },
    {
      $lookup: {
        from: "orders",
        localField: "owner",
        foreignField: "_id",
        as: "orders",
        pipeline: [
          {
            $lookup: {
              from: "fooditems",
              localField: "_id",
              foreignField: "items",
              as: "food",
              pipeline: [
                {
                  $project: {
                    name: 1,
                    photo: 1,
                    price: 1,
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ]);
  //!Wrong pipelines have to check later
  res
    .status(200)
    .json(new ApiResponse(200, user, "User orders fetched Succesfully"));
});
export const getUserCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ owner: req.user?._id });

  res.status(200).json(new ApiResponse(200, cart, "Cart Succesfully fetched"));
});
export const getUserFavouriteLists = asyncHandler(async (req, res) => {});
