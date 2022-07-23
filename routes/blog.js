const express = require("express");
const { getBlog, postBlog } = require("../controllers/blog");

const router = express.Router();

router.route("/:id").get(getBlog);
router.route("/").post(postBlog);

module.exports = router;
