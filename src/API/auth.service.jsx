import axios from "axios";

const API_USER_URL = "http://localhoost:9000/api/auth";

class AuthService {
  //AUTH
  login(username, password) {
    return axios
      .post(API_USER_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToker) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_USER_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
