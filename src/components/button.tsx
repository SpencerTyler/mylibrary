import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary" | "danger";
};

export default function Button({
  children,
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "flex gap-1 py-1 px-2 cursor-pointer",
        "border border-gray-800 rounded",
        "transition-colors",
        "bg-gray-100 hover:bg-gray-200 text-stone-950",
        variant === "primary" && "bg-blue-800 hover:bg-blue-600 text-stone-100",
        variant === "danger" && "bg-red-600 hover:bg-red-500 text-stone-100",
        "disabled:cursor-not-allowed disabled:opacity-75",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
