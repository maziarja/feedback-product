"use client";

import { ProductRequestType } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { FaCheck } from "react-icons/fa6";

type Status = ProductRequestType["status"];

type StatusDropdownProps = {
  setStatus: Dispatch<SetStateAction<Status>>;
  status: Status;
  closeStatus: () => void;
};
const statusArr: Status[] = ["in-progress", "live", "planned", "suggestion"];

function StatusDropdown({
  setStatus,
  status,
  closeStatus,
}: StatusDropdownProps) {
  return (
    <div className="divide-dark-blue/15 text-blue-gray absolute top-0 left-0 flex w-full flex-col divide-y-2 rounded-lg bg-white shadow-2xl">
      {statusArr.map((stat) => {
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              setStatus(stat);
              closeStatus();
            }}
            role="button"
            key={stat}
            className="hover:text-purple flex cursor-pointer items-center justify-between px-6 py-3"
          >
            <p className="text-base">{stat.split("-").join(" ")}</p>
            {stat === status && <FaCheck size={16} className="fill-purple" />}
          </button>
        );
      })}
    </div>
  );
}

export default StatusDropdown;
