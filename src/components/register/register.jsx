import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./register.scss";
import { Link } from "react-router-dom";
import background from "../../img/interstellar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../userActions/userActions";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate("/home");
  }, [navigate, success]);

  const submitForm = (data) => {
    //check if the password match
    if (data.password !== data.confirmPassword) {
      alert("Password mismatch");
      return;
    }
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
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
            <label className="form-label" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              className="form-input"
              {...register("firstName")}
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
            <label className="form-label" htmlFor="email">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-input"
              {...register("confirmPassword")}
              required
            />
          </div>
          <button type="submit" className="button-register" disabled={loading}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
