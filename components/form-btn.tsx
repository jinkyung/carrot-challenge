"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="py-3 text-sm font-semibold rounded-full bg-neutral-100 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed hover:bg-neutral-200 focus:scale-90"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
