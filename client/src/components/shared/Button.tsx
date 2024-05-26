"use client";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({
  onClick,
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full mt-2 px-4 py-2 transition-colors border-2 border-blue-600 text-blue-600 rounded disabled:bg-gray-400 disabled:text-gray-900 disabled:border-none hover:text-white hover:bg-blue-600 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}
