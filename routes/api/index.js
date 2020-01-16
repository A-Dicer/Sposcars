const router      = require("express").Router();
const authRoutes  = require("./auth");
const userRoutes  = require("./users");
const picksRoutes = require("./picks");

router.use("/auth", authRoutes); // Auth routes
router.use("/users", userRoutes); // User routes
router.use("/picks", picksRoutes); //Picks routes

module.exports = router;
