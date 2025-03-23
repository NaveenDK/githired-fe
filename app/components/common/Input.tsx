import { FC } from "react";

interface InputProps {
  type: 'text' | 'password';
  placeholder: string;
  className?: string;
}

export const Input: FC<InputProps> = ({ type, placeholder, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={"px-6 py-3 rounded-lg border border-gray-300 w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-purple-500 " + className}
    />
  );
};
