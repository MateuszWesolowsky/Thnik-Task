import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isDisabled: boolean;
}
export const ButtonSubmit = ({ children, isDisabled }: Props) => (
  <button
    type="submit"
    disabled={isDisabled}
    className={`text-white px-4 py-2 rounded-md w-full transition-colors ${
      isDisabled
        ? "bg-default cursor-not-allowed"
        : "bg-active hover:bg-hover cursor-pointer"
    }`}
  >
    {children}
  </button>
);
