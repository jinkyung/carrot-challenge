import { InputHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

interface InputProps {
  icon?: ReactNode;
  name: string;
  errors?: string[];
}

export default function Input({
  icon,
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative flex flex-col gap-2">
      {icon ? (
        <span className="absolute text-gray-700 left-4 top-3">{icon}</span>
      ) : null}
      <input
        className={cn(
          "w-full pr-4 h-10 text-gray-700 text-sm transition bg-transparent border rounded-full  focus:outline-none focus:ring-2 focus:ring-offset-1 placeholder:text-neutral-400",
          icon ? "pl-10" : "pl-4",
          errors?.length
            ? "border-red-400 focus:ring-red-400"
            : "border-neutral-200 focus:ring-neutral-200"
        )}
        name={name}
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-sm font-medium text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
}
