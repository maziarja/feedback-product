"use server";

import { signIn } from "@/lib/auth";

export async function googleLogin() {
  await signIn("google", {
    redirectTo: "/",
  });
}
