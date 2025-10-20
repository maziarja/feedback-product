"use client";

import {
  createFeedbackSchema,
  CreateFeedbackType,
  ProductRequestType,
} from "@/lib/types";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import CategoryDropdown from "./CategoryDropdown";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";
import { createProductRequest } from "@/app/_actions/productRequest/createProductRequest";
import { useRouter } from "next/navigation";
import IconNewFeedback from "../UI/IconNewFeedback";

type Category = ProductRequestType["category"];

function AddFeedbackForm() {
  const [category, setCategory] = useState<Category>("feature");
  const [openCategory, setOpenCategory] = useState(false);
  const closeCategory = () => setOpenCategory(false);
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<CreateFeedbackType>({
    resolver: zodResolver(createFeedbackSchema),
  });

  async function onSubmit(data: CreateFeedbackType) {
    const result = await createProductRequest(data, category);
    if (result?.success) {
      reset();
      router.push("/feedbacks/suggestions");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative rounded-lg bg-white px-6 pt-11.5 pb-5.5"
    >
      <div className="absolute -top-6 left-3">
        <IconNewFeedback className="scale-72" />
      </div>
      <div className="space-y-6">
        <p className="text-dark-blue text-lg font-bold">Create New Feedback</p>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <p className="text-dark-blue text-sm font-bold">Feedback Title</p>
            <p className="text-blue-gray text-sm">
              Add a short, descriptive headline
            </p>
          </div>
          <div>
            <textarea
              {...register("title")}
              id="title"
              className={`bg-very-light-blue-gray text-very-dark-blue hover:ring-blue field-sizing-content min-h-12 w-full resize-none rounded-sm p-4 text-sm outline-none hover:cursor-pointer hover:ring-1 ${errors.title ? "ring-1 ring-red-500 hover:ring-red-500" : "ring-0"}`}
            />
            <AnimatePresence>
              {errors.title && (
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6 }}
                  className="mt-1 text-xs font-semibold text-red-500"
                >
                  {errors.title.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <p className="text-dark-blue text-sm font-bold">Category</p>
            <p className="text-blue-gray text-sm">
              Choose a category for your feedback
            </p>
          </div>

          <div
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setOpenCategory((open) => !open);
            }}
            className="bg-very-light-blue-gray flex cursor-pointer items-center rounded-lg px-4 py-3"
          >
            <p className="bg-very-light-blue-gray pointer-events-none w-full">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </p>
            {!openCategory ? (
              <MdKeyboardArrowDown size={18} className="fill-blue" />
            ) : (
              <MdKeyboardArrowUp size={18} className="fill-blue" />
            )}
          </div>
          <AnimatePresence>
            {openCategory && (
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <CategoryDropdown
                  setCategory={setCategory}
                  category={category}
                  closeCategory={closeCategory}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mb-10 space-y-4">
          <div className="space-y-1.5">
            <p className="text-dark-blue text-sm font-bold">Feedback Detail</p>
            <p className="text-blue-gray text-sm">
              Include any specific comments on what should be improved, added,
              etc.
            </p>
          </div>
          <div>
            <textarea
              {...register("description")}
              id="description"
              className={`bg-very-light-blue-gray text-very-dark-blue hover:ring-blue field-sizing-content min-h-30 w-full resize-none rounded-sm p-4 text-sm outline-none hover:cursor-pointer hover:ring-1 ${errors.description ? "ring-1 ring-red-500 hover:ring-red-500" : "ring-0"}`}
            />
            <AnimatePresence>
              {errors.description && (
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6 }}
                  className="mt-1 text-xs font-semibold text-red-500"
                >
                  {errors.description.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <button
          disabled={isSubmitting}
          className="bg-purple hover:bg-purple/80 cursor-pointer rounded-lg px-4 py-2.5 text-sm font-bold text-white md:order-2"
        >
          {!isSubmitting ? "Add Feedback" : "Creating..."}
        </button>
        <Link
          href={"/feedbacks/suggestions"}
          className="bg-dark-blue hover:bg-dark-blue/80 cursor-pointer rounded-lg px-4 py-2.5 text-center text-sm font-bold text-[#F2F4FE] md:ml-auto"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

export default AddFeedbackForm;
