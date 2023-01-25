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
                  <button className="button-profile">Log in</button>
                </Link>
                <Link to="/register">
                  <button className="button-profile">Register</button>
                </Link>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="button-profile-container">
            <button
              className="button-profile-username"
              id="buttonProfileUsername"
              ref={ref}
              onClick={handleOpen}>
              {usernameLogin}
            </button>
            {isComponentVisible ? (
              <div className="button-login-register" id="buttonLoginRegister">
                <Link to={"/profile?user=" + usernameLogin}>
                  <button className="button-profile">Profile</button>
                </Link>
                <Link to="/home">
                  <button className="button-profile" onClick={logout}>
                    Log out
                  </button>{" "}
                </Link>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginButton;
