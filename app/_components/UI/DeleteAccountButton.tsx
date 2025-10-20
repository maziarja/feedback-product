"use client";

import { useRouter } from "next/navigation";
import { TiUserDelete } from "react-icons/ti";

function DeleteAccountButton() {
  const router = useRouter();

  function handleClickDeleteAccount() {
    router.push("/feedbacks/suggestions/delete-account");
  }
  return (
    <div className="flex cursor-pointer items-center gap-2">
      <TiUserDelete className="fill-white" size={18} />
      <button
        onClick={handleClickDeleteAccount}
        className="text-very-dark-blue cursor-pointer text-sm font-semibold md:text-white"
      >
        Delete Account
      </button>
    </div>
  );
}

export default DeleteAccountButton;
