import { ReactNode } from "react";

interface FormInputProps {
  icon?: ReactNode;
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

export default function FormInput({
  icon,
  type,
  name,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <div className="relative flex flex-col gap-2">
      {icon ? (
        <span className="absolute text-gray-700 left-4 top-3">{icon}</span>
      ) : null}
      <input
        className={`w-full pr-4 h-10 text-gray-700 text-sm transition bg-transparent border rounded-full  focus:outline-none focus:ring-2 focus:ring-offset-1 placeholder:text-neutral-400 ${
          icon ? "pl-10" : "pl-4"
        } ${
          errors?.length
            ? "border-red-400 focus:ring-red-400"
            : "border-neutral-200 focus:ring-neutral-200"
        }`}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-sm font-medium text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
}
