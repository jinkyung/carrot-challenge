"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="py-3 text-sm font-semibold transition rounded-full bg-neutral-100 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed hover:bg-neutral-200 focus:scale-90"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
