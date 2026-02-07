"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  fullWidth?: boolean;
}

export const Button = ({ onClick, children, variant = "primary", fullWidth }: ButtonProps) => {
  const baseStyles = "focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-6 py-2.5 mb-2 transition-all duration-200 ease-in-out transform active:scale-95";

  const variants = {
    primary: "text-white bg-slate-900 hover:bg-slate-800 focus:ring-slate-400 shadow-lg hover:shadow-xl hover:shadow-blue-500/20",
    secondary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 shadow-md",
    outline: "text-slate-900 border border-slate-900 hover:bg-slate-50 focus:ring-slate-200",
    ghost: "text-slate-600 hover:bg-slate-100 focus:ring-slate-200",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${baseStyles} ${variants[variant]} ${widthClass}`}
    >
      {children}
    </button>
  );
};
