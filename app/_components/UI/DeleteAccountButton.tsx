"use client";

import { useRouter } from "next/navigation";
import { TiUserDelete } from "react-icons/ti";

function DeleteAccountButton() {
  const router = useRouter();

  function handleClickDeleteAccount() {
    router.push("/feedbacks/suggestions/delete-account");
  }
  return (
    <div className="group flex cursor-pointer items-center gap-2 transition-all duration-500 lg:translate-x-25 lg:hover:translate-x-0">
      <TiUserDelete className="fill-white" size={18} />
      <button
        onClick={handleClickDeleteAccount}
        className="text-very-dark-blue cursor-pointer text-sm font-semibold duration-500 md:text-white lg:-translate-x-5 lg:opacity-0 lg:group-hover:block lg:group-hover:translate-x-0 lg:group-hover:opacity-100"
      >
        Delete Account
      </button>
    </div>
  );
}

export default DeleteAccountButton;
