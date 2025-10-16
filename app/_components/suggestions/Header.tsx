"use client";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import SortbyDropDown from "./SortbyDropDown";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import AddFeedbackLink from "../UI/AddFeedbackLink";

type HeaderProps = {
  numOfFeedbacks: number | undefined;
};

function Header({ numOfFeedbacks }: HeaderProps) {
  const [sortByDropDown, setSortByDropDown] = useState(false);
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "Most UpVotes";

  return (
    <div className="bg-very-dark-blue text-light-blue-gray flex items-center justify-between py-4.5 pr-6 pl-6 md:rounded-lg md:pr-3">
      <div className="md:flex md:items-center md:gap-9.5">
        <div className="hidden items-center gap-4 md:flex">
          <FaRegLightbulb size={24} />
          <p className="text-lg font-bold">{numOfFeedbacks} Suggestions</p>
        </div>
        <div
          role="button"
          onClick={() => setSortByDropDown((show) => !show)}
          className="relative flex cursor-pointer items-center gap-1 text-sm"
        >
          <span>Sort by :</span>{" "}
          <button className="cursor-pointer font-bold">
            {sortBy?.split("-").join(" ")}{" "}
            <MdKeyboardArrowDown className="inline-block" size={20} />
          </button>
          <AnimatePresence>
            {sortByDropDown && (
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.2 }}
                className="absolute top-15"
              >
                <SortbyDropDown />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AddFeedbackLink />
    </div>
  );
}

export default Header;
