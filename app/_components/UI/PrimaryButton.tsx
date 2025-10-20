"use client";
import { FormEvent } from "react";

function PrimaryButton({
  children,
  onClick,
  isPending,
}: {
  children: React.ReactNode;
  onClick: (e: FormEvent) => Promise<void>;
  isPending: boolean;
}) {
  return (
    <button
      disabled={isPending}
      onClick={onClick}
      className={`bg-purple hover:bg-purple/80" cursor-pointer rounded-lg px-4 py-2.5 text-sm font-bold text-white ${isPending && "bg-purple/80"}`}
    >
      {!isPending ? children : "Posting..."}
    </button>
  );
}

export default PrimaryButton;
