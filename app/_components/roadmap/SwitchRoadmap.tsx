"use client";

import { useSwitchRoadmap } from "@/app/contexts/SwitchRoadmapContext";

type SwitchRoadmapProps = {
  numOfFeedbacks: {
    inProgress: number;
    live: number;
    planned: number;
  };
};

function SwitchRoadmap({ numOfFeedbacks }: SwitchRoadmapProps) {
  const { switchRoadmap, setSwitchRoadmap } = useSwitchRoadmap();

  return (
    <div className="flex items-center md:hidden">
      <button
        className={`${switchRoadmap === "planned" ? "text-dark-blue border-orange border-b-4" : "text-dark-blue/60 border-b-1 border-gray-300"} flex-1 py-4 text-sm font-bold transition-all duration-200`}
        onClick={() => setSwitchRoadmap("planned")}
      >
        Planned ({numOfFeedbacks.planned})
      </button>
      <button
        className={`${switchRoadmap === "in-progress" ? "text-dark-blue border-purple border-b-4" : "text-dark-blue/60 border-b-1 border-gray-300"} flex-1 py-4 text-sm font-bold transition-all duration-200`}
        onClick={() => setSwitchRoadmap("in-progress")}
      >
        In-Progress ({numOfFeedbacks.inProgress})
      </button>
      <button
        className={`${switchRoadmap === "live" ? "text-dark-blue border-light-blue border-b-4" : "text-dark-blue/60 border-b-1 border-gray-300"} flex-1 py-4 text-sm font-bold transition-all duration-200`}
        onClick={() => setSwitchRoadmap("live")}
      >
        Live ({numOfFeedbacks.live})
      </button>
    </div>
  );
}

export default SwitchRoadmap;
