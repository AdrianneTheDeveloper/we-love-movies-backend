const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const cors = require("cors");
const corsGet = cors({ methods: "GET" });

router.route("/:reviewId").all(cors()).put(controller.update).delete(controller.destroy);

module.exports = router;