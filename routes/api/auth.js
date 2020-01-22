const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require("passport");
const twit = require("../../config/twitAuth.js");

// --------------------- Matches with "/api/auth" --------------------------

// ---------------------------- Local Auth ---------------------------------
router.route("/login").post(authController.doLogin);
// router.route("/register").post(authController.doRegister);

// --------------------------- Twitter Auth --------------------------------
// router.route("/twitter").post(authController.twitter);
// router.route("/twitter/callback").post(authController.twitCallback)

// router.route('/login').post(passport.authenticate('local', { failureRedirect: '/' }),
// function(req, res) {
//   console.log(`auth.js --------------------------`)
//   console.log(req.user)
//   res.redirect(`${twit.redirect}/${req.user._id}`);
// });
// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

router.route("/twitter").get(passport.authenticate('twitter'));
router.route("/twitter/callback")
.get(passport.authenticate("twitter", { failureRedirect: "/" }), 
  function(req, res) {
    res.redirect(`${twit.redirect}/${req.user._id}` );
});

// ------------------------------ Logout -----------------------------------
router.route("/logout").get(authController.logout) //logout
  
module.exports = router;
