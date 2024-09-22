import { useNavigate } from "react-router-dom";
import { HomeProps } from "../types";

const Home = ({ loggedIn, email, setLoggedIn }: HomeProps) => {
  const navigate = useNavigate();

  const loginHandler = () => {
    if (loggedIn) {
      setLoggedIn(false);
    } else {
      navigate("/login");
    }
    return;
  };

  const signUpHandler = () => {
    navigate("/register");
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Welcome!</div>
      </div>
      <div>This is the Homepage</div>
      <div className="buttonContainer">
        <div className="inputContainer">
          <button
            className="inputBox"
            onClick={loginHandler}
          >
            {loggedIn ? "Log out" : "Log in"}
          </button>
          {!loggedIn && (
            <button
              className="inputBox"
              onClick={signUpHandler}
            >
              Sign up
            </button>
          )}
        </div>
        <div>{loggedIn && `Your email address is ${email}`}</div>
      </div>
    </div>
  );
};

export default Home;
