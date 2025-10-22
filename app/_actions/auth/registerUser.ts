"use server";

import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/database";
import { registerUserSchema } from "@/lib/types";
import User from "@/models/Users";
import bcrypt from "bcryptjs";
import { FieldValues } from "react-hook-form";

export async function registerUser(data: FieldValues) {
  try {
    await connectDB();

    const validRegisterUser = registerUserSchema.safeParse(data);

    if (!validRegisterUser.success) {
      const errorMessage = validRegisterUser.error.issues[0].message;

      return { success: false, errorMessage };
    }

    const existingUser = await User.findOne({
      email: validRegisterUser.data.email,
    });
    if (existingUser) {
      return { success: false, errorMessage: "User already has an account" };
    }

    const hashedPassword = await bcrypt.hash(
      validRegisterUser.data.password,
      10,
    );

    // Upload profile picture
    if (validRegisterUser.data.image[0].size > 1000000) {
      return { success: false, errorMessage: "Image must be below 1MB" };
    }
    const imageFile = validRegisterUser.data.image as FileList;
    let result;
    if (imageFile[0]?.name !== "undefined" && imageFile.length > 0) {
      const imageBuffer = Buffer.from(await imageFile[0].arrayBuffer());
      const base64 = imageBuffer.toString("base64");
      const dataUri = `data:${imageFile[0].type};base64,${base64}`;

      result = await cloudinary.uploader.upload(dataUri, {
        folder: "product-feedback",
      });
    }

    await User.create({
      name: validRegisterUser.data.name,
      email: validRegisterUser.data.email,
      ...(result?.secure_url && { image: result?.secure_url }),
      password: hashedPassword,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: "Something went wrong" };
  }
}
