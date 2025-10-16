"use client";
import { FiLogOut } from "react-icons/fi";

import { logout } from "@/app/_actions/auth/logout";
import { useSidebar } from "@/app/contexts/SidebarContext";

function SignoutButton() {
  const { toggleSidebar } = useSidebar();
  async function handleSignoutClick() {
    toggleSidebar();
    await logout();
  }

  return (
    <button
      onClick={handleSignoutClick}
      className="flex cursor-pointer items-center gap-2 px-2 py-1 md:self-start md:px-0 md:py-0"
    >
      <p className="text-very-dark-blue text-sm font-semibold md:hidden md:text-white">
        Logout
      </p>
      <FiLogOut
        className="stroke-very-dark-blue md:rotate-180 md:stroke-white"
        size={18}
      />
      <p className="text-very-dark-blue hidden text-sm font-semibold md:inline-block md:text-white">
        Logout
      </p>
    </button>
  );
}

export default SignoutButton;
