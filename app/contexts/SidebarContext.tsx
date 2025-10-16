"use client";

import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  toggleSidebar: () => void;
  sidebar: boolean;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => setSidebar((open) => !open);

  return (
    <SidebarContext.Provider
      value={{
        toggleSidebar,
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
