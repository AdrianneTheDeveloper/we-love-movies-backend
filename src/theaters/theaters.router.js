const controller = require("./theaters.controller");
const router = require("express").Router({ mergeParams: true });
const cors = require("cors");
const corsGet = cors({ methods: "GET" });

router.route("/").all(cors()).get( controller.list);

module.exports = router