"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCheck } from "react-icons/fa6";

const sortByArr = [
  "Most-UpVotes",
  "Least-UpVotes",
  "Most-Comments",
  "Least-Comments",
] as const;

export type SortBy = (typeof sortByArr)[number];

function SortbyDropDown() {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "Most-UpVotes";

  return (
    <div className="divide-dark-blue/15 text-blue-gray flex w-[150%] cursor-pointer flex-col divide-y-2 rounded-lg bg-white shadow-2xl">
      {sortByArr.map((sort) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sortBy", sort);
        return (
          <Link
            href={`?${params.toString()}`}
            key={sort}
            className="hover:text-purple flex items-center justify-between px-6 py-3"
          >
            <p className="text-base">{sort.split("-").join(" ")}</p>
            {sortBy === sort && <FaCheck size={16} className="fill-purple" />}
          </Link>
        );
      })}
    </div>
  );
}

export default SortbyDropDown;
