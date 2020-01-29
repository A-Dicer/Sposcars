const router = require("express").Router();
const twitterController = require("../../controllers/twitterController");

router.route("/:id").get(twitterController.findAll)

module.exports = router;


