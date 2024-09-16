import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  loggedIn: boolean;
  email: string;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Home = ({ loggedIn, email, setLoggedIn }: HomeProps) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    // TDB
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Title here</div>
      </div>
      <div>This is the Homepage</div>
      <div className="buttonContainer">
        <input
          type="button"
          className="inputButton"
          value={loggedIn ? "Log out" : "Log in"}
        />
        <div>{loggedIn && `Your email address is ${email}`}</div>
      </div>
    </div>
  );
};

export default Home;
