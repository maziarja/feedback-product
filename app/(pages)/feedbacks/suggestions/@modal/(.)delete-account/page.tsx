import { getUser } from "@/app/_actions/user/getUser";
import DeleteAccountModal from "@/app/_components/authentication/DeleteAccountModal";
import { auth } from "@/lib/auth";

async function Page() {
  const session = await auth();
  if (!session) return;
  const user = await getUser();
  if (!user) return null;
  return <DeleteAccountModal user={user} />;
}

export default Page;
