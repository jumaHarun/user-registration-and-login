import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import Registration from "./pages/Registration";
import Header from "./components/Header";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loggedIn={loggedIn}
                email={email}
                setLoggedIn={setLoggedIn}
              />
            }
          />

          <Route
            path="/login"
            element={
              <Login
                setEmail={setEmail}
                setLoggedIn={setLoggedIn}
              />
            }
          />

          <Route
            path="/register"
            element={<Registration />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
