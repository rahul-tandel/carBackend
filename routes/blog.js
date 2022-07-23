const express = require("express");
const { getBlog } = require("../controllers/blog");

const router = express.Router();

router.route("/:id").get(getBlog);
router.route("/").post(getBlog);

module.exports = router;
