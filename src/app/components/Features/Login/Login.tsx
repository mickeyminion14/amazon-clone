import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import "./Login.scss";
import ReportProblemOutlined from "@material-ui/icons/ReportProblemOutlined";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const history = useHistory();

  const login = (event: any) => {
    event.preventDefault();
    setErrorMessage("");
    setShowErrorMessage(false);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.message);
        setShowErrorMessage(true);
      });
  };

  const register = (event: any) => {
    event.preventDefault();
    setErrorMessage("");
    setShowErrorMessage(false);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.message);
        setShowErrorMessage(true);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/800px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      {showErrorMessage ? (
        <div className="login__error">
          <div className="login__errorHeading">
            <ReportProblemOutlined className="login__errorHeadingIcon" />
            <p className="login__errorHeadingText">There was a problem</p>
          </div>
          <p className="login__errorText">{errorMessage}</p>
        </div>
      ) : null}

      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
          <h5>Password</h5>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />

          <button onClick={login} type="submit" className="login__signInButton">
            Sign In
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}
export default Login;
