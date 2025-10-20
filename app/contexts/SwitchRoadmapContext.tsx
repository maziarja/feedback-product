"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Roadmap = "planned" | "in-progress" | "live";
type SwitchRoadmapContextType = {
  setSwitchRoadmap: Dispatch<SetStateAction<Roadmap>>;
  switchRoadmap: Roadmap;
};

const SwitchRoadmapContext = createContext<
  SwitchRoadmapContextType | undefined
>(undefined);

export function SwitchRoadmapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [switchRoadmap, setSwitchRoadmap] = useState<Roadmap>("in-progress");

  return (
    <SwitchRoadmapContext.Provider
      value={{
        setSwitchRoadmap,
        switchRoadmap,
      }}
    >
      {children}
    </SwitchRoadmapContext.Provider>
  );
}

export const useSwitchRoadmap = () => {
  const context = useContext<SwitchRoadmapContextType | undefined>(
    SwitchRoadmapContext,
  );
  if (context === undefined)
    throw new Error(
      "SwitchRoadmap context was used outside of switchRoadmap provider",
    );
  return context;
};
