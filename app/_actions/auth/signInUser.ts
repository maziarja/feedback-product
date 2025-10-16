"use server";

import { signIn } from "@/lib/auth";
import { loginUserSchema } from "@/lib/types";
import { FieldValues } from "react-hook-form";

export async function signInUser(data: FieldValues) {
  const validLoginUserData = loginUserSchema.safeParse(data);

  if (!validLoginUserData.success) {
    const errorMessage = validLoginUserData.error.issues[0].message;
    return { success: false, errorMessage };
  }

  try {
    await signIn("credentials", {
      email: validLoginUserData.data.email,
      password: validLoginUserData.data.password,
      redirect: false,
    });
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: "Invalid email or password" };
  }

  return { success: true };
}
