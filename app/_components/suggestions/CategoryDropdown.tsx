"use client";

import { ProductRequestType } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { FaCheck } from "react-icons/fa6";

type Category = ProductRequestType["category"];

type CategoryDropdownProps = {
  setCategory: Dispatch<SetStateAction<Category>>;
  category: Category;
  closeCategory: () => void;
};
const categoryArr: Category[] = ["UI", "UX", "bug", "enhancement", "feature"];

function CategoryDropdown({
  setCategory,
  category,
  closeCategory,
}: CategoryDropdownProps) {
  return (
    <div className="divide-dark-blue/15 text-blue-gray absolute top-0 left-0 flex w-full flex-col divide-y-2 rounded-lg bg-white shadow-2xl">
      {categoryArr.map((cat) => {
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              setCategory(cat);
              closeCategory();
            }}
            role="button"
            key={cat}
            className="hover:text-purple flex cursor-pointer items-center justify-between px-6 py-3"
          >
            <p className="text-base">{cat.split("-").join(" ")}</p>
            {cat === category && <FaCheck size={16} className="fill-purple" />}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryDropdown;
