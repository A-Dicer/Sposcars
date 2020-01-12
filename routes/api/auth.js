const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require("passport");
const twit = require("../../config/twitAuth.js");

// --------------------- Matches with "/api/auth" --------------------------

router.route("/twitter").get(passport.authenticate('twitter'));

router.route("/twitter/callback")
.get(passport.authenticate("twitter", { failureRedirect: "/" }), 
  function(req, res) {
    res.redirect(twit.redirect);
});

router.route("/logout").get(authController.logout) //logout
  
module.exports = router;
