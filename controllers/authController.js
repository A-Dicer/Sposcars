const twit = require("../config/twitAuth.js");

module.exports = {

//------------------------- LogOut User -------------------------------
  logout: function (req, res) {
    req.logOut();
    res.redirect(twit.redirect)
  }
};
