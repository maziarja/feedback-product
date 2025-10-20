"use client";

import { logout } from "@/app/_actions/auth/logout";
import { useSidebar } from "@/app/contexts/SidebarContext";
import { BiSolidLogOutCircle } from "react-icons/bi";

function SignoutButton() {
  const { closeSidebar } = useSidebar();
  async function handleSignoutClick() {
    closeSidebar();
    await logout();
  }

  return (
    <button
      onClick={handleSignoutClick}
      className="flex cursor-pointer items-center gap-2 px-2 py-1 md:self-start md:px-0 md:py-0"
    >
      <BiSolidLogOutCircle
        className="stroke-very-dark-blue md:stroke-white"
        size={18}
      />
      <p className="text-very-dark-blue text-sm font-semibold md:text-white">
        Logout
      </p>
    </button>
  );
}

export default SignoutButton;
