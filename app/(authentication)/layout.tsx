import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!!session) redirect("/");

  return children;
}

export default AuthenticationLayout;
