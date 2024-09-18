import { ChangeEventHandler } from "react";

type InputProps = {
  type: "email" | "password" | "confirmPassword";
  inputPlaceholder: "yourmail@yourcompany.com" | "*******";
  inputValue: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  inputError?: string;
};

const FormInput = ({
  type,
  inputPlaceholder,
  inputValue,
  onChangeHandler,
  inputError,
}: InputProps) => {
  return (
    <div className="inputContainer">
      <input
        type={type === "confirmPassword" ? "password" : type}
        name={type}
        placeholder={inputPlaceholder}
        className="inputBox"
        value={inputValue}
        onChange={onChangeHandler}
      />
      {type !== "confirmPassword" && (
        <label className="errorLabel">{inputError}</label>
      )}
      <br />
    </div>
  );
};

export default FormInput;
