import axios from "axios";

const API_USER_URL = "http://localhoost:9000/api/users";

class UserService {
  //USER
  getPublicContent() {
    return axios.get(API_USER_URL + "all");
  }
}

export default new UserService();
