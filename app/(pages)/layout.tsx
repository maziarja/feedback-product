import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function PagesLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");
  return <div className="min-h-dvh bg-[#f2f2f2]">{children}</div>;
}

export default PagesLayout;
