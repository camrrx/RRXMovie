import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./register.scss";
import { Link } from "react-router-dom";
import background from "../../img/kingkong.jpeg";
import { useNavigate } from "react-router-dom";
import logo from "../../img/rrxLogoWhite.png";

import axios from "axios";

const Register = (props) => {
  const { register, handleSubmit } = useForm();
  const [isRegistered, setIsRegistered] = React.useState(false);

  const navigate = useNavigate();

  const API_USER_URL = "http://localhost:9000/users/";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    // redirect user to login page if registration was successful
    if (isRegistered) {
      navigate("/login");
      setIsRegistered(false);
    }
  }, [navigate, isRegistered]);

  const submitForm = async (data) => {
    //check if the password match
    if (data.password !== data.confirmPassword) {
      alert("Password mismatch");
      return;
    }
    data.email = data.email.toLowerCase();
    console.log("data submitted", data);

    //try to send the request to the BE to register the user
    try {
      const email = data.email;
      const username = data.username;
      const password = data.password;

      await axios.post(
        API_USER_URL + "register",
        {
          email,
          username,
          password,
        },
        config
      );
      setIsRegistered(true);
    } catch (err) {
      console.log("error register", err);
    }
  };

  return (
    <div
      className="register-container"
      style={{
        backgroundImage: `url(${background})`,
      }}>
      <div className="background-register-container">
        <div>
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
        </div>
        <div>
          <form
            className="form-register-container"
            onSubmit={handleSubmit(submitForm)}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                className="form-input"
                {...register("username")}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-input"
                {...register("email")}
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
                {...register("password")}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-input"
                {...register("confirmPassword")}
                required
              />
            </div>
            <button type="submit" className="button-register">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
