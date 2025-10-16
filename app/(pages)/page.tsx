import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();
  if (session) redirect("/feedbacks/suggestions");
}

export default page;
