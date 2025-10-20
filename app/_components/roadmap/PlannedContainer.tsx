"use client";

import { useSwitchRoadmap } from "@/app/contexts/SwitchRoadmapContext";

type PlannedContainerProps = {
  children: React.ReactNode;
  plannedFeedbacksNum: number;
};

function PlannedContainer({
  plannedFeedbacksNum,
  children,
}: PlannedContainerProps) {
  const { switchRoadmap } = useSwitchRoadmap();
  const isPlanned = switchRoadmap === "planned";
  return (
    <div className={`${isPlanned ? "block" : "hidden md:block"} px-6 md:px-0`}>
      <div className="mb-6 space-y-1">
        <p className="text-dark-blue text-lg font-bold">
          Planned{" "}
          <span className="hidden md:inline-block">
            ({plannedFeedbacksNum})
          </span>
        </p>
        <p className="text-blue-gray text-sm">Ideas prioritized for research</p>
      </div>
      {children}
    </div>
  );
}

export default PlannedContainer;
