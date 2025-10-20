"use client";

import { useSwitchRoadmap } from "@/app/contexts/SwitchRoadmapContext";

type InProgressContainerProps = {
  children: React.ReactNode;
  inProgressFeedbackNum: number;
};

function InProgressContainer({
  children,
  inProgressFeedbackNum,
}: InProgressContainerProps) {
  const { switchRoadmap } = useSwitchRoadmap();
  const isProgress = switchRoadmap === "in-progress";
  return (
    <div className={`${isProgress ? "block" : "hidden md:block"} px-6 md:px-0`}>
      <div className="mb-6 space-y-1">
        <p className="text-dark-blue text-lg font-bold">
          In-Progress{" "}
          <span className="hidden md:inline-block">
            ({inProgressFeedbackNum})
          </span>
        </p>
        <p className="text-blue-gray text-sm">
          <span className="md:hidden">Features</span> currently being developed
        </p>
      </div>
      {children}
    </div>
  );
}

export default InProgressContainer;
