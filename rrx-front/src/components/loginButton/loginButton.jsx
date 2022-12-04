import React, { useEffect } from "react";
import "./loginButton.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import useComponentVisible from "../../helper/useComponentVisible";
import { useDispatch } from "react-redux";

const LoginButton = (props) => {
  const successLogin = useSelector((state) => state.loginUser.successLogin);
  const usernameLogin = useSelector((state) => state.loginUser.usernameLogin);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      dispatch({
        type: "loginUser/getLoginData",
        payload: { usernameLogin: loggedInUser, successLogin: true },
      });
    }
    if (isComponentVisible && !successLogin) {
      document.getElementById("buttonSignIN").style.display = "none";
    } else if (!successLogin) {
      document.getElementById("buttonSignIN").style.display = "initial";
    }

    if (isComponentVisible && successLogin) {
      document.getElementById("buttonProfileUsername").style.display = "none";
    } else if (successLogin) {
      document.getElementById("buttonProfileUsername").style.display =
        "initial";
    }
  }, [props.moviesParam, isComponentVisible, successLogin, dispatch]);

  const handleOpen = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const logout = () => {
    dispatch({
      type: "loginUser/logout",
      payload: {},
    });
    localStorage.clear();
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
            <button
              className="button-profile-username"
              id="buttonProfileUsername"
              ref={ref}
              onClick={handleOpen}>
              {usernameLogin}
            </button>
            {isComponentVisible ? (
              <div className="button-login-register">
                {/* <Link to="/Profile"> */}
                <button id="button">Profile</button>
                {/* </Link> */}
                <button id="button" onClick={logout}>
                  Log out
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginButton;
