"use client";

import { useSidebar } from "@/app/contexts/SidebarContext";
import Link from "next/link";

function ViewRoadmapLink() {
  const { closeSidebar } = useSidebar();
  return (
    <Link
      onClick={closeSidebar}
      href={"/feedbacks/roadmap"}
      className="text-blue text-sm font-semibold underline"
    >
      View
    </Link>
  );
}

export default ViewRoadmapLink;
