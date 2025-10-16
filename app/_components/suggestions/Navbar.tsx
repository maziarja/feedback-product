"use client";

import { useSidebar } from "@/app/contexts/SidebarContext";
import { MdMenu, MdClose } from "react-icons/md";

function Navbar() {
  const { sidebar, toggleSidebar } = useSidebar();

  return (
    <div
      className={`flex items-center justify-between bg-linear-24 from-[#28a7ed] from-0% via-[#a337f6] via-53% to-[#e84d70] to-100% px-6 py-4 text-white md:hidden`}
    >
      <div>
        <p className="text-base font-bold">Frontend Mentor</p>
        <p className="text-sm font-medium">Feedback Board</p>
      </div>

      <button onClick={toggleSidebar}>
        {sidebar ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>
    </div>
  );
}

export default Navbar;
