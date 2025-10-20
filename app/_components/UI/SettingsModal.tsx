"use client";
import { useSettingsModal } from "@/app/contexts/SettingsModalContext";
import SignoutButton from "../authentication/SignoutButton";
import { TiUserDelete } from "react-icons/ti";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { useSidebar } from "@/app/contexts/SidebarContext";
import { useRouter } from "next/navigation";

function SettingsModal() {
  const { closeSettingsModal } = useSettingsModal();
  const { closeSidebar } = useSidebar();
  const router = useRouter();
  const ref = useOutsideClick(closeSettingsModal);

  function handleClickDeleteAccount() {
    closeSettingsModal();
    closeSidebar();
    router.push("/feedbacks/suggestions/delete-account");
  }

  return (
    <div
      ref={ref}
      className="absolute top-15 right-10 space-y-2 rounded-lg bg-white px-4 py-2 shadow-lg drop-shadow-2xl"
    >
      <SignoutButton />
      <div className="flex cursor-pointer items-center gap-2 px-2 py-1">
        <TiUserDelete className="fill-very-dark-blue" size={18} />
        <button
          onClick={handleClickDeleteAccount}
          className="text-very-dark-blue cursor-pointer text-sm font-semibold md:hidden md:text-white"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
