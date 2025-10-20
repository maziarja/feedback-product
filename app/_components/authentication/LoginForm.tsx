"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";
import { loginUserSchema, LoginUserType } from "@/lib/types";
import { signInUser } from "@/app/_actions/auth/signInUser";
import GmailButton from "./GmailButton";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<LoginUserType>({
    resolver: zodResolver(loginUserSchema),
  });

  async function onSubmit(data: FieldValues) {
    const result = await signInUser(data);
    if (!result.success)
      setError("root", { type: "server", message: result.errorMessage });
    if (result.success) {
      reset();
      router.push("/");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-45 flex w-full max-w-3xl flex-col gap-8 rounded-3xl bg-white px-7 py-11 md:shadow-lg"
    >
      <label
        htmlFor="email"
        className="flex flex-col gap-2 text-lg font-semibold tracking-wide"
      >
        Email
        <input
          {...register("email")}
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className={`w-full border-b-1 ${errors.email ? "border-red-500" : "border-gray-300"} py-2 text-base font-normal tracking-wide text-gray-800 transition-colors duration-200 outline-none`}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, x: -400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -400 }}
              transition={{ duration: 0.6 }}
              className="text-sm font-normal text-red-500"
            >
              {errors.email.message}
            </motion.p>
          )}
        </AnimatePresence>
      </label>
      <label
        htmlFor="password"
        className="relative flex flex-col gap-2 text-lg font-semibold tracking-wide"
      >
        Password
        <input
          {...register("password")}
          id="password"
          name="password"
          type={!showPassword ? "password" : "text"}
          placeholder="Enter your password"
          className={`w-full border-b-1 ${errors.password ? "border-red-500" : "border-gray-300"} py-2 text-base font-normal tracking-wide text-gray-800 transition-colors duration-200 outline-none`}
        />
        <AnimatePresence>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, x: -400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -400 }}
              transition={{ duration: 0.6 }}
              className="text-sm font-normal text-red-500"
            >
              {errors.password.message}
            </motion.p>
          )}
        </AnimatePresence>
        <div
          role="button"
          onClick={() => setShowPassword((show) => !show)}
          className="absolute top-12 right-2 cursor-pointer text-gray-500"
        >
          {!showPassword ? <IoMdEye /> : <IoMdEyeOff />}
        </div>
      </label>
      <AnimatePresence>
        {errors.root && (
          <motion.p
            initial={{ opacity: 0, x: -400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -400 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-normal text-red-500"
          >
            {errors.root.message}
          </motion.p>
        )}
      </AnimatePresence>
      <button className="bg-purple/90 hover:bg-purple/70 cursor-pointer rounded-full py-3.5 text-lg font-semibold tracking-wide text-white">
        {!isSubmitting ? (
          "Login"
        ) : (
          <ImSpinner2 size={24} className="mx-auto animate-spin" />
        )}
      </button>
      <p className="text-center text-sm text-gray-700">
        Don&#39;t have an account yet? Register{" "}
        <Link
          href={"/signup"}
          className="text-purple/80 cursor-pointer font-bold hover:underline"
        >
          here
        </Link>
      </p>
      <div className="flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-gray-300"></div>
        <p className="text-sm text-gray-700">Or login with</p>
        <div className="h-[1px] flex-1 bg-gray-300"></div>
      </div>
      <GmailButton />
    </form>
  );
}

export default LoginForm;
