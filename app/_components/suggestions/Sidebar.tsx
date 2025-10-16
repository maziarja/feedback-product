"use client";

import { useEffect } from "react";
import CategoryTags from "./CategoryTags";
import { ProductRequestType } from "@/lib/types";
import { useSidebar } from "@/app/contexts/SidebarContext";
import SignoutButton from "../authentication/SignoutButton";

type SidebarProps = {
  children: React.ReactNode;
  filterBy: ProductRequestType["category"] | "all";
};

function Sidebar({ children, filterBy }: SidebarProps) {
  const { sidebar } = useSidebar();

  useEffect(() => {
    if (sidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebar]);

  return (
    <>
      {sidebar && (
        <div className="fixed inset-0 top-19 z-1 overflow-hidden bg-black/55 md:hidden" />
      )}

      <div
        className={`bg-very-light-blue-gray fixed right-0 z-99 flex h-full max-w-67.5 flex-col gap-6 p-6 md:hidden ${!sidebar && "translate-x-100"} duration-200 ease-in-out`}
      >
        <div className="ml-auto">
          <SignoutButton />
        </div>
        <CategoryTags filterBy={filterBy} />
        {children}
      </div>
    </>
  );
}

export default Sidebar;
