import { redirect } from "next/navigation";

function page() {
  redirect("/feedbacks/suggestions");
  return null;
}

export default page;
