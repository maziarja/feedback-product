"use client";

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* Outer ring */}
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--color-light-blue-gray)] border-t-[var(--color-blue)]"></div>

          {/* Inner glow ring */}
          <div className="animate-spin-slow absolute h-8 w-8 rounded-full border-4 border-transparent border-t-[var(--color-purple)]"></div>
        </div>
      </div>
    </div>
  );
}
