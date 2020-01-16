const router = require("express").Router();
const picksController = require("../../controllers/picksController");

//--------------- Matches with "/api/picks" --------------------
router.route("/").get(picksController.findAll).post(picksController.create);
router.route("/:id").get(picksController.findById).put(picksController.update)
 
module.exports = router;