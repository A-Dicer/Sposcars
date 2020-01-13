import axios from "axios";

export default {
//------------------------------ Users Api --------------------------------------
  getUsers: function() {return axios.get("/api/users")}, // Gets all users
}