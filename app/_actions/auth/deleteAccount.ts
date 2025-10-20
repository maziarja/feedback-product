"use server";

import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import bcrypt from "bcryptjs";
import { deleteDbData } from "./deleteDbData";
import User from "@/models/Users";
import { convertToObject } from "@/lib/convertToObject";
import { deleteUserSchema } from "@/lib/types";

export async function deleteAccount(userId: string, password?: string) {
  try {
    const session = await auth();
    // check if userId === session
    const userDoc = await User.findOne({ email: session?.user?.email }).lean();
    const userNoType = convertToObject(userDoc);
    if (!userDoc) return;
    const validUser = deleteUserSchema.safeParse(userNoType);
    if (!validUser.success) {
      console.error(validUser.error);
      return;
    }
    const user = validUser.data;
    if (!session?.user?.id) throw new Error("Unauthorized");
    if (userId !== user?._id) throw new Error("Unauthorized");
    // check if user id from google
    if (user.provider === "google") {
      deleteDbData(user);
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password as string,
        user.password as string,
      );
      if (isPasswordCorrect) {
        // delete cloudinary image
        if (user && "image" in user && user.image) {
          const isCloudinaryImage =
            user.image?.split("/").at(2) === "res.cloudinary.com";
          if (isCloudinaryImage) {
            const userImage = user.image.split("/").at(-1)?.split(".").at(0);
            await cloudinary.uploader.destroy("product-feedback/" + userImage);
          }
        }
        // delete db data
        deleteDbData(user);
      }
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
