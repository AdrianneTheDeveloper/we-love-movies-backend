const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const cors = require("cors");
const corsGet = cors({ methods: "GET" });

router.route("/").all(cors()).get(controller.list);
router.route("/:movieId").all(cors()).get(controller.read);
router.route("/:movieId/theaters").all(cors()).get(controller.findAllTheaters);
router.route("/:movieId/reviews").all(cors()).get(controller.findReviewsAndCritics);

module.exports = router;
