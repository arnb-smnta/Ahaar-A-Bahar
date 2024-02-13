import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  AccessTokenExpiry,
  AccessTokenSecret,
  RefreshTokenExpiry,
  RefreshTokenSecret,
} from "../utils/envFiles.js";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    mobile: {
      type: Number,
      required: true,
      trim: true,
      index: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    order: [{ type: Schema.Types.ObjectId }],
    address: [
      {
        name: String,
        mobileno: String,
        houseNo: String,
        street: String,
        landmark: String,
        city: String,
        country: String,
        postalcode: String,
      },
    ],
  },
  { timestamps: true }
);

//User functions

//1.Pre hook to save the password in encrypted form we are using the function here not an arrow function because arrow function does not have scope to this keyword
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    AccessTokenSecret,
    {
      expiresIn: AccessTokenExpiry,
    }
  );
};

userSchema.methods.generateRefereshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    RefreshTokenSecret,
    {
      expiresIn: RefreshTokenExpiry,
    }
  );
};

export const User = mongoose.model("User", userSchema);
