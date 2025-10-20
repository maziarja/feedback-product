"use server";

import { auth } from "@/lib/auth";
import { convertToObject } from "@/lib/convertToObject";
import connectDB from "@/lib/database";
import { UserSchema } from "@/lib/types";
import User from "@/models/Users";

export async function getUser() {
  try {
    await connectDB();
    const session = await auth();
    if (!session?.user?.email) return;

    const userDoc = await User.findOne({ email: session.user.email }).lean();
    const user = convertToObject(userDoc);
    if (!userDoc) return;
    const validUser = UserSchema.safeParse(user);
    if (!validUser.success) {
      console.error(validUser.error);
      return;
    }

    return validUser.data;
  } catch (error) {
    console.error(error);
  }
}
