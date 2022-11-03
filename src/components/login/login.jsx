import React from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import { Link } from "react-router-dom";
import background from "../../img/interstellar.jpg";

const Login = (props) => {
  const { login, handleLogin } = useForm();

  const isLoginPossible = (data) => {
    console.log();
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${background})`,
      }}>
      <div className="background-login-container">
        <Link to="/home">
          <div className="header-container">
            <div className="title-container">
              <div>
                <h1 className="title">RrX | </h1>
              </div>

              <div id="text-movie">
                <p>
                  <small>The</small> Movie Ratings App
                </p>
              </div>
            </div>
          </div>
        </Link>
        <form
          className="form-login-container"
          onSubmit={handleLogin(isLoginPossible)}>
          <div className="form-email">
            <label className="form-label" htmlFor="email">
              Username
            </label>
            <input
              type="email"
              className="form-input"
              {...login("email")}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-input"
              {...login("password")}
              required
            />
          </div>
          <button type="submit" className="button-login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
