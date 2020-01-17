import axios from "axios";

export default {
//------------------------------ Users Api --------------------------------------
  getUsers: function() {return axios.get("/api/users")}, // Gets all users

//------------------------------ Picks Api --------------------------------------
  getPicks: function(id) {return axios.get("/api/picks/" + id)}, // Gets picks with the given id
  saveNewPicks: function(picksData) {return axios.post("/api/picks", picksData)}, // Saves new picks to the database
  updatePicks: function(id, info){return axios.put("/api/picks/" + id, info)}, // updates when you "save" a split

  //------------------------------- logout ----------------------------------------
  logout: function() {return axios.get("/api/auth/logout")}, //logout
}