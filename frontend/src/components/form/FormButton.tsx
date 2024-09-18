import { useLocation } from "react-router-dom";

type ButtonProps = {
  isLoading: boolean;
};

const FormButton = ({ isLoading }: ButtonProps) => {
  let buttonText;

  const { pathname } = useLocation();

  if (pathname === "/register") {
    buttonText = isLoading ? "Registering..." : "Register";
  } else if (pathname === "/login") {
    buttonText = isLoading ? "Logging in..." : "Login";
  }

  return (
    <div className="inputContainer">
      <button
        type="submit"
        className="inputButton"
        disabled={isLoading}
      >
        {buttonText!}
      </button>
      <br />
    </div>
  );
};

export default FormButton;
