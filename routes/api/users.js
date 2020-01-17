const router = require("express").Router();
const usersController = require("../../controllers/usersController");


//------------- Matches with "/api/users" --------------------
router.route("/").get(usersController.findAll)
router.route("/:id").get(usersController.findById).put(usersController.update)
    
module.exports = router;
