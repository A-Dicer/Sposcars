const router      = require("express").Router();
const authRoutes  = require("./auth");
const userRoutes  = require("./users");
const picksRoutes = require("./picks");
const twitterRoutes = require("./twitter");

router.use("/auth", authRoutes); // Auth routes
router.use("/users", userRoutes); // User routes
router.use("/picks", picksRoutes); //Picks routes
router.use("/twitter", twitterRoutes); //Twitter routes

module.exports = router;
