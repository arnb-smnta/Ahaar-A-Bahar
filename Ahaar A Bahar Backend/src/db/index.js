import mongoose from "mongoose";
import { DB_name, mongodbURL } from "../utils/envFiles.js";

const connectDb = async () => {
  console.log(mongodbURL, DB_name);
  try {
    const connecttionInstance = await mongoose.connect(
      `${mongodbURL}/${DB_name}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST : ${connecttionInstance.connection.host}`
    );
  } catch (err) {
    console.log("DB connection error", err);
    process.exit(1);
  }
};
export default connectDb;
