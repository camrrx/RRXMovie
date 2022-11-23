import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import { Link } from "react-router-dom";
import background from "../../img/starwars.jpeg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../img/rrxLogoWhite.png";

const Login = (props) => {
  const [isLoggedIn, setIsLoggedin] = React.useState(false);

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_USER_URL = "http://localhost:9000/users/";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (isLoggedIn) {
      navigate("/home");
      setIsLoggedin(false);
    }
  }, [navigate, isLoggedIn]);

  const isLoginPossible = async (data) => {
    dispatch({
      type: "loginUser/getLoginData",
      payload: data.usernameLogin,
    });

    try {
      const usernameLogin = data.usernameLogin;
      const passwordLogin = data.passwordLogin;
      await axios.post(
        API_USER_URL + "login",
        {
          usernameLogin,
          passwordLogin,
        },
        config
      );
      setIsLoggedin(true);
    } catch (e) {
      console.log("error loggin", e);
    }
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
                <img className="logo-rrx" src={logo} alt="" />{" "}
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
          onSubmit={handleSubmit(isLoginPossible)}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              type="username"
              className="form-input"
              {...register("usernameLogin")}
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
              {...register("passwordLogin")}
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
