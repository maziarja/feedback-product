"use client";

import { useEffect } from "react";
import CategoryTags from "./CategoryTags";
import { ProductRequestType } from "@/lib/types";
import { useSidebar } from "@/app/contexts/SidebarContext";
import { useSettingsModal } from "@/app/contexts/SettingsModalContext";
import SettingsModal from "../UI/SettingsModal";
import { RiUserSettingsFill } from "react-icons/ri";

type SidebarProps = {
  children: React.ReactNode;
  filterBy: ProductRequestType["category"] | "all";
};

function Sidebar({ children, filterBy }: SidebarProps) {
  const { sidebar } = useSidebar();
  const { settingsModal, toggleSettingsModal } = useSettingsModal();

  useEffect(() => {
    const html = document.documentElement;
    if (sidebar) {
      html.style.overflow = "hidden";
      html.style.position = "fixed";
      html.style.width = "100%";
      window.scrollTo(0, 0);
    } else {
      html.style.overflow = "auto";
      html.style.position = "";
      html.style.width = "";
    }
  }, [sidebar]);

  return (
    <div className="relative">
      {sidebar && (
        <div className="fixed inset-0 top-19 z-1 overflow-hidden bg-black/55 md:hidden" />
      )}

      <div
        className={`bg-very-light-blue-gray fixed right-0 z-99 flex h-full max-w-67.5 flex-col gap-6 p-6 md:hidden ${!sidebar && "translate-x-100"} duration-200 ease-in-out`}
      >
        <button
          onClick={toggleSettingsModal}
          className="ml-auto flex cursor-pointer items-center gap-2"
        >
          <RiUserSettingsFill className="fill-purple" size={20} />
        </button>
        <CategoryTags filterBy={filterBy} />
        {children}
        {settingsModal && <SettingsModal />}
      </div>
    </div>
  );
}

export default Sidebar;
