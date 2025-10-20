"use client";

import { useSwitchRoadmap } from "@/app/contexts/SwitchRoadmapContext";

type LiveContainerProps = {
  children: React.ReactNode;
  liveFeedbacksNum: number;
};

function LiveContainer({ children, liveFeedbacksNum }: LiveContainerProps) {
  const { switchRoadmap } = useSwitchRoadmap();
  const isLive = switchRoadmap === "live";
  return (
    <div className={`${isLive ? "block" : "hidden md:block"} px-6 md:px-0`}>
      <div className="mb-6 space-y-1">
        <p className="text-dark-blue text-lg font-bold">
          Live{" "}
          <span className="hidden md:inline-block">({liveFeedbacksNum})</span>
        </p>
        <p className="text-blue-gray text-sm">Released features</p>
      </div>
      {children}
    </div>
  );
}

export default LiveContainer;
