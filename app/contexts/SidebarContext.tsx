"use client";

import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  toggleSidebar: () => void;
  closeSidebar: () => void;
  sidebar: boolean;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => setSidebar((open) => !open);
  const closeSidebar = () => setSidebar(false);

  return (
    <SidebarContext.Provider
      value={{
        toggleSidebar,
        closeSidebar,
        sidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext<SidebarContextType | undefined>(SidebarContext);
  if (context === undefined)
    throw new Error("Sidebar context was used outside of sidebar provider");
  return context;
};
