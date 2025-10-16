"use client";
import { FormEvent } from "react";

function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: (e: FormEvent) => Promise<void>;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-purple hover:bg-purple/80 cursor-pointer rounded-lg px-4 py-2.5 text-sm font-bold text-white"
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
