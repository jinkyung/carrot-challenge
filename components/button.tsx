"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
  hiddenLoading?: boolean;
  children?: React.ReactNode;
}

export default function Button({ text, hiddenLoading, children }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending && !hiddenLoading}
      className="p-3 text-sm font-semibold transition rounded-full bg-neutral-100 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed hover:bg-neutral-200 focus:scale-90"
    >
      {pending && !hiddenLoading ? "Loading..." : text || children}
    </button>
  );
}
