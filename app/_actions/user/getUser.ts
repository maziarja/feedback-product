"use server";

import { convertToObject } from "@/lib/convertToObject";
import connectDB from "@/lib/database";
import { UserSchema } from "@/lib/types";
import User from "@/models/Users";

export async function getUser(userId: string) {
  await connectDB();
  const userDoc = await User.findById(userId).lean();
  const user = convertToObject(userDoc);

  const validUser = UserSchema.safeParse(user);
  if (!validUser.success) {
    console.error(validUser.error);
    return;
  }

  return validUser.data;
}
