"use client";

import { googleLogin } from "@/app/_actions/auth/googleLogin";
import { SiGmail } from "react-icons/si";

function GmailButton() {
  async function handleClick() {
    await googleLogin();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="ring-purple/15 mx-auto flex cursor-pointer rounded-full p-4 shadow-lg transition-all duration-200 hover:ring-2"
    >
      <SiGmail color="#ad1feacb" size={20} />
    </button>
  );
}

export default GmailButton;
