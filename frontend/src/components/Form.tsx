import { useState } from "react";
import { ThandleChannge, ThandleSubmit } from "../types";

type FormProps = {
  loading: boolean;
  handleChange: ThandleChannge;
  handleSubmit: ThandleSubmit;
};

const Form = ({ loading, handleChange, handleSubmit }: FormProps) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSubmitHandler = () => {
    // Set initial empty error values
    setEmailError("");
    setPasswordError("");

    // Check if user has entered required fields correctly
    if (userEmail === "") {
      setEmailError("Please enter your email!");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userEmail)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (userPassword === "") {
      setPasswordError("Please enter a password");
      return;
    }

    if (userPassword.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    // Authentication calls will be made here...
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <div className="inputContainer">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <div className="inputContainer">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
        </div>
        <div className="inputContainer">
          <button
            type="submit"
            className="inputButton"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Form;
