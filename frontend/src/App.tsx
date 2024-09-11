import "./App.css";

function App() {
  return (
    <>
      <p className="title">Registration Form</p>

      <form
        action=""
        className="app-form"
      >
        <input
          type="email"
          name="userEmail"
          id="emailInput"
          placeholder="example@mail.com"
        />
        <input
          type="password"
          name="userPassword"
          id="passwordInput"
          placeholder="********"
          minLength={8}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
