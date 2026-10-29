
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import fs from "fs/promises";

import dotenv from "dotenv";
import { error } from "console";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.Api_key,
  api_secret: process.env.Api_secret,
});

export const signle_img_url = async (path) => {
  let compressedPath;

  try {
    // Create the uploads directory if it doesn't exist
    const uploadDir = "./uploads";
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate a temporary compressed image path
    compressedPath = `${uploadDir}/compressed-${Date.now()}.webp`;

    // Resize and compress image using Sharp
    await sharp(path)
      .resize({
        width: 1200,
        withoutEnlargement: true,
      })
      .webp({
        quality: 60,
      })
      .toFile(compressedPath);

    // Upload compressed image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      compressedPath,
      {
        resource_type: "image",
      }
    );

    console.log("Original:", path);
    console.log("Uploaded:", uploadResult.secure_url);

    return uploadResult;
  } catch (err) {
    console.error("Image upload error:", err.message);
    throw err;
  } finally {
    // Delete temporary compressed image
    if (compressedPath) {
      await fs.unlink(compressedPath).catch(() => {});
    }
  }
};


export const delete_img_url = async (publicid)=>{
  try {
      const deleteresult=await cloudinary.uploader.destroy(publicid,{resource_type:"image"});
      return deleteresult;
  }

  catch (err) {
    console.log(err.message);
    throw err;
  }
}

export const multiple_img_url = async(paths)=>{
  try{
    const uploadResults=await Promise.all(paths.map(async (path)=>{
      const compressedPath=`.uploads/compressed-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.webp`;
    }));
    return uploadResults;

  }

  catch (err){console.log(err.message)}
  throw error
}