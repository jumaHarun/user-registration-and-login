import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import {
  RegistrationUserData,
  UserFormErrors,
  HandleChangeHandler,
  HandleSubmitHandler,
} from "../types";
import { FormButton, FormInput } from "../components/form/index";

const Registration = () => {
  const [formData, setFormData] = useState<RegistrationUserData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<UserFormErrors>({
    emailError: "",
    passwordError: "",
    formError: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange: HandleChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit: HandleSubmitHandler = async (e) => {
    e.preventDefault();

    setErrors({});
    setSuccessMessage(null);
    setLoading(true);

    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      setErrors({ formError: "All fields are required!" });
      setLoading(false);
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setErrors({ emailError: "Please enter a valid email" });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ passwordError: "Password do not match!" });
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setErrors({
        passwordError: "Password must be at least 8 characters long!",
      });
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrors({
        passwordError: "Password must contain at least one uppercase letter",
      });
      setLoading(false);
      return;
    }

    if (!/[0-9]/.test(password)) {
      setErrors({ passwordError: "Password must contain at least one number" });
      setLoading(false);
      return;
    }

    // Call API
    try {
      const response = await registerUser({ email, password });
      console.log("User registered", response);
      setSuccessMessage("Regristration successful!");
      setLoading(false);
      navigate("/");
    } catch (err) {
      const error = err as Error;

      console.error("Error registering user", error);
      setErrors({
        formError: error.message || "Registration failed. Try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>User Registration</div>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        {errors.formError && (
          <label className="errorLabel">{errors.formError}</label>
        )}

        <FormInput
          type="email"
          inputPlaceholder="yourmail@yourcompany.com"
          inputValue={formData.email}
          onChangeHandler={(e) => handleChange(e)}
          inputError={errors.emailError}
        />
        <FormInput
          type="password"
          inputPlaceholder="*******"
          inputValue={formData.password}
          onChangeHandler={(e) => handleChange(e)}
          inputError={errors.passwordError}
        />
        <FormInput
          type="confirmPassword"
          inputPlaceholder="*******"
          inputValue={formData.confirmPassword}
          onChangeHandler={(e) => handleChange(e)}
        />

        <FormButton isLoading={loading} />

        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
    </div>
  );
};
export default Registration;
