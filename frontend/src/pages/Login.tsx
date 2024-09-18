import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { FormButton, FormInput } from "../components/form/index";
import { loginUser } from "../services/authService";

type LoginProps = {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
};

const Login = ({ setEmail, setLoggedIn }: LoginProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    const { email, password } = formData;
    if (!email || !password) {
      setErrorMessage("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser({ email, password });
      console.log("Login successful!", response);
      setSuccessMessage("Login successful!");
      setEmail(email);
      setLoggedIn(true);
      setLoading(false);
      navigate("/");
    } catch (err) {
      const error = err as Error;

      console.error("Error logging in!", error);
      setErrorMessage(error.message || "Login failed. Try again.");
      setLoading(false);
    }
  };
  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Login</div>
      </div>
      <br />

      <form onSubmit={handleSubmit}>
        <label className="errorLabel">{errorMessage}</label>

        <FormInput
          type="email"
          inputPlaceholder="yourmail@yourcompany.com"
          inputValue={formData.email}
          onChangeHandler={handleChange}
        />

        <FormInput
          type="password"
          inputPlaceholder="*******"
          inputValue={formData.password}
          onChangeHandler={handleChange}
        />

        <FormButton isLoading={loading} />

        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
