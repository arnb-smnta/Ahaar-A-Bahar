import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
export const envport = process.env.SERVER_PORT;
export const mongodbURL = process.env.MONGODB_URL;
export const DB_name = process.env.DB_NAME;
export const cors_origin = process.env.CORS_ORIGIN;
export const AccessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const RefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
export const AccessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
export const RefreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;
export const CloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
export const CloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
export const CloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
export const email_pass = process.env.GOOGLE_EMAIL_PASS;
export const nodemail_email = process.env.GOOGLE_EMAIL;
