import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

export type HomeProps = {
  loggedIn: boolean;
  email: string;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export type LoginProps = {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
};

export type RegistrationUserData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserFormErrors = {
  emailError?: string;
  passwordError?: string;
  formError?: string;
};

export type HandleChangeHandler = {
  (e: ChangeEvent<HTMLInputElement>): void;
};

export type HandleSubmitHandler = {
  (e: FormEvent): Promise<void>;
};
