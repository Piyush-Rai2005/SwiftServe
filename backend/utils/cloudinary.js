// utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a local file to Cloudinary and deletes it locally.
 * @param {string} localFilePath - Local file path from multer (req.file.path)
 * @returns {object} - Cloudinary upload result
 */
const uploadToCloudinary = async (localFilePath) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "SwiftServe", // Optional: set a folder in your Cloudinary account
    });

    // Delete local file after upload
    fs.unlinkSync(localFilePath);

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Failed:", error);
    throw error;
  }
};

export { uploadToCloudinary };
export default cloudinary;
