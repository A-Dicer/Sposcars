const twit = require("../config/twitAuth.js");
const passport = require("passport");

module.exports = {
//-------------------------- LogIn User -------------------------------
  doLogin: function(req, res, next){
		passport.authenticate('local', function(err, user, msg){
			if (err) { return next(err); }
			if (!user){
				var data = { error: err, msg: msg }
				return res.json(data);
			}
			if(user){
			 	req.logIn(user, function(){ return res.json(user)});	 
			}
		})(req, res, next);
	},

//------------------------- LogOut User -------------------------------
  logout: function (req, res) { req.logOut(); res.redirect(twit.redirect)}
};
