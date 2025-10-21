"use client";

import { deleteAccount } from "@/app/_actions/auth/deleteAccount";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { UserType } from "@/lib/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function DeleteAccountModal({ user }: { user: UserType }) {
  const router = useRouter();
  const ref = useOutsideClick(() => router.back());
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmitDeleteAccount(e: FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const result = await deleteAccount(user._id, password);
    if (result?.success) {
      setIsPending(true);
      await signOut({ callbackUrl: "/login" });
      setIsPending(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-1 overflow-hidden bg-black/55">
        <div
          ref={ref}
          className="absolute top-1/2 left-1/2 z-9 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-4 py-6 md:max-w-md"
        >
          <form
            onSubmit={handleSubmitDeleteAccount}
            className="flex w-full flex-col space-y-4"
          >
            <p className="text-very-dark-blue text-sm font-semibold">
              Are you sure you want to delete your account? This action is
              permanent and will remove all your data.
            </p>

            {user.provider !== "google" && (
              <label
                htmlFor="password"
                className="relative flex flex-col gap-2 tracking-wide"
              >
                <input
                  id="password"
                  type={!showPassword ? "password" : "text"}
                  placeholder="Enter your password"
                  name="password"
                  className={`w-full border-b-1 py-2 text-base font-normal tracking-wide text-gray-800 transition-colors duration-200 outline-none`}
                />
                <div
                  role="button"
                  onClick={() => setShowPassword((show) => !show)}
                  className="absolute top-3.5 right-2 cursor-pointer text-gray-500"
                >
                  {!showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </div>
              </label>
            )}
            <button
              disabled={isPending}
              className="cursor-pointer rounded-lg border-1 bg-red-400 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400/80"
            >
              {!isPending ? (
                "Delete"
              ) : (
                <ImSpinner2 className="mx-auto animate-spin" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DeleteAccountModal;
