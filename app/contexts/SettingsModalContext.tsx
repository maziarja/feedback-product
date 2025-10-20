"use client";

import { createContext, useContext, useState } from "react";

type SettingsModalContextType = {
  toggleSettingsModal: () => void;
  closeSettingsModal: () => void;
  settingsModal: boolean;
};

const SettingsModalContext = createContext<
  SettingsModalContextType | undefined
>(undefined);

export function SettingsModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settingsModal, setSettingsModal] = useState(false);
  const toggleSettingsModal = () => setSettingsModal((open) => !open);
  const closeSettingsModal = () => setSettingsModal(false);

  return (
    <SettingsModalContext.Provider
      value={{
        toggleSettingsModal,
        closeSettingsModal,
        settingsModal,
      }}
    >
      {children}
    </SettingsModalContext.Provider>
  );
}

export const useSettingsModal = () => {
  const context = useContext<SettingsModalContextType | undefined>(
    SettingsModalContext,
  );
  if (context === undefined)
    throw new Error(
      "SettingsModal context was used outside of settingsModal provider",
    );
  return context;
};
