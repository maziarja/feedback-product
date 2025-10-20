"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import { ImSpinner2 } from "react-icons/im";
import { registerUser } from "@/app/_actions/auth/registerUser";
import { registerUserSchema, RegisterUserType } from "@/lib/types";
import GmailButton from "./GmailButton";

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState("");
  const router = useRouter();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    reset,
  } = useForm<RegisterUserType>({
    resolver: zodResolver(registerUserSchema),
  });

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  }

  async function onSubmit(data: FieldValues) {
    const result = await registerUser(data);
    if (!result.success)
      setError("root", { type: "server", message: result.errorMessage });

    if (result.success) {
      reset();
      toast.success("Your account was created successfully.");
      router.push("/login");
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute top-45 flex w-full max-w-3xl flex-col gap-8 rounded-3xl bg-white px-7 py-11 md:shadow-lg"
      >
        <label className="absolute -top-9 right-1/2 translate-x-1/2 md:-top-11">
          {!image && (
            <div className="rounded-full bg-[#EFF1F3] p-6 md:p-7">
              <IoCamera color="#606060" size={24} className="md:h-8 md:w-8" />
            </div>
          )}
          {image && (
            <div className="relative h-18 w-18 overflow-hidden rounded-full border border-[#EFF1F3]">
              <Image
                src={image}
                fill
                className="object-cover"
                alt="profile picture"
                sizes="72px"
              />
            </div>
          )}
          <input
            {...register("image")}
            type="file"
            name="image"
            accept="image/*"
            className="absolute inset-0 cursor-pointer appearance-none opacity-0"
            onChange={handleChangeImage}
          />
        </label>
        <label
          htmlFor="name"
          className="flex flex-col gap-2 text-lg font-semibold tracking-wide"
        >
          Name
          <input
            {...register("name")}
            id="name"
            type="text"
            name="name"
            placeholder="e.g: John Doe"
            className={`w-full border-b-1 ${errors.name ? "border-red-500" : "border-gray-300"} py-2 text-base font-normal tracking-wide text-gray-800 transition-colors duration-200 outline-none`}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, x: -400 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -400 }}
                transition={{ duration: 0.6 }}
                className="text-sm font-normal text-red-500"
              >
                {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </label>
        <label
          htmlFor="email"
          className="flex flex-col gap-2 text-lg font-semibold tracking-wide"
        >
          Email
          <input
            {...register("email")}
            id="email"
            type="text"
            name="email"
            placeholder="e.l: johndoe@gmail.com"
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple/90 hover:bg-purple/70 cursor-pointer rounded-full py-3.5 text-lg font-semibold tracking-wide text-white"
        >
          {!isSubmitting ? (
            "Create Account"
          ) : (
            <ImSpinner2 size={24} className="mx-auto animate-spin" />
          )}
        </button>
        <p className="text-center text-sm text-gray-700">
          Already have an account?
          <Link
            href={"/login"}
            className="text-purple/80 cursor-pointer font-bold hover:underline"
          >
            {" "}
            Login
          </Link>
        </p>

        {/* <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gray-300"></div>
          <p className="text-sm text-gray-700">Or login with</p>
          <div className="h-[1px] flex-1 bg-gray-300"></div>
        </div> */}
        <GmailButton />
      </form>
    </>
  );
}

export default SignupForm;
