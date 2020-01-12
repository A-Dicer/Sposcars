const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./users");

router.use("/auth", authRoutes); // Auth routes
router.use("/users", userRoutes); // User routes

module.exports = router;
