import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./register.scss";
import { Link } from "react-router-dom";
import background from "../../img/interstellar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Register = (props) => {
  const { username, email, password, success } = useSelector(
    (state) => state.registerUser
  );
  const { register, handleSubmit } = useForm();
  const [isRegistered, setIsRegistered] = React.useState(false);

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
    if (isRegistered) {
      navigate("/login");
      setIsRegistered(false);
    }
  }, [navigate, isRegistered]);

  const submitForm = (data) => {
    //check if the password match
    if (data.password !== data.confirmPassword) {
      alert("Password mismatch");
      return;
    }
    data.email = data.email.toLowerCase();

    dispatch({
      type: "registerUser/fillRegisterForm",
      payload: data,
    });
    //try to send the request to the BE to register the user
    try {
      axios.post(
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
  );
};
export default Register;
