const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require("passport");
const twit = require("../../config/twitAuth.js");

// --------------------- Matches with "/api/auth" --------------------------

// ---------------------------- Local Auth ---------------------------------
router.route("/login").post(authController.doLogin);//login
router.route("/logout").get(authController.logout) //logout

// --------------------------- Twitter Auth --------------------------------
router.route("/twitter").get(passport.authenticate('twitter'));
router.route("/twitter/callback")
.get(passport.authenticate("twitter", { failureRedirect: "/" }), 
  function(req, res) {
    res.redirect(`${twit.redirect}/${req.user._id}` );
});

module.exports = router;
