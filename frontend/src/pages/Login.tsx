import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

const Login = ({ setEmail, setLoggedIn }: LoginProps) => {
  const [emailInp, setEmailInp] = useState("");
  const [passwordInp, setPasswordInp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onClickHandler = () => {
    // Set initial empty error values
    setEmailError("");
    setPasswordError("");

    // Check if user has entered required fields correctly
    if (emailInp === "") {
      setEmailError("Please enter your email!");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailInp)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === passwordInp) {
      setPasswordError("Please enter a password");
      return;
    }

    if (passwordInp.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    // Authentication calls will be made here...
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Login</div>
      </div>
      <br />
      <div className="inputContainer">
        <input
          type="email"
          className="inputBox"
          placeholder="exampleuser@mail.com"
          value={emailInp}
          onChange={(e) => setEmailInp(e.target.value)}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />

      <div className="inputContainer">
        <input
          type="password"
          className="inputBox"
          placeholder="********"
          value={passwordInp}
          onChange={(e) => setPasswordInp(e.target.value)}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          type="button"
          className="inputButton"
          value={"Log in"}
          onClick={onClickHandler}
        />
      </div>
    </div>
  );
};

export default Login;
