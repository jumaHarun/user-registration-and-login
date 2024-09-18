import { ChangeEventHandler } from "react";

// Form
export type ButtonProps = {
  isLoading: boolean;
};

export type InputProps = {
  type: "email" | "password" | "confirmPassword";
  inputPlaceholder: "yourmail@yourcompany.com" | "*******";
  inputValue: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  inputError?: string;
};
