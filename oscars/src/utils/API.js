import axios from "axios";

export default {
//------------------------------ Users Api --------------------------------------
  getUsers: function() {return axios.get("/api/users")}, // Gets all users
  updateUser: function(id, info){return axios.put("/api/users/" + id, info)}, 
  register: function(user) {return axios.post("/api/users/register", user)},
  
//------------------------------ Picks Api --------------------------------------
  getPicks: function(id) {return axios.get("/api/picks/" + id)}, // Gets picks with the given id
  updatePicks: function(id, info){return axios.put("/api/picks/" + id, info)}, // updates when you "save" a split
  saveNewPicks: function(picksData) {return axios.post("/api/picks", picksData)}, // Saves new picks to the database

  //------------------------------- logout ----------------------------------------
  login: function(data){console.log('axios: ------------'); console.log(data); return axios.post("/api/auth/login", data)},
  logout: function() {return axios.get("/api/auth/logout")}, //logout
}



//clean up page!!!!!!!!!!!!-----------------------------