import React, { useEffect } from "react";
import "./loginButton.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import useComponentVisible from "../../helper/useComponentVisible";

const LoginButton = (props) => {
  const successLogin = useSelector((state) => state.loginUser.successLogin);
  const usernameLogin = useSelector((state) => state.loginUser.usernameLogin);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  useEffect(() => {
    if (isComponentVisible) {
      document.getElementById("buttonSignIN").style.display = "none";
    } else if (!successLogin) {
      document.getElementById("buttonSignIN").style.display = "initial";
    }
  }, [props.moviesParam, isComponentVisible, successLogin]);

  const handleOpen = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <div>
      <div id="search-header-sign-in-id" className="search-header-sign-in">
        {!successLogin ? (
          <div className="button-profile-container">
            <div id="buttonSignIN" className="button-profile">
              <div className="icon-container" ref={ref} onClick={handleOpen}>
                <CgProfile className="icon-profile" />
              </div>
            </div>
            {isComponentVisible ? (
              <div className="button-login-register" id="buttonLoginRegister">
                <Link to="/login">
                  <button id="button">Log in</button>
                </Link>
                <Link to="/register">
                  <button id="button">Register</button>
                </Link>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <button className="button-profile-username">{usernameLogin}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginButton;
