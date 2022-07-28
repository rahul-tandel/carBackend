const express = require("express");
const {
  getBlog,
  postBlog,
  getSingleBlog,
  editBlog,
  deleteBlog,
} = require("../controllers/blog");

const router = express.Router();

router.route("/:id").get(getBlog);
router.route("/").post(postBlog);
router.route("/u/:id").get(getSingleBlog);
router.route("/:id").put(editBlog);
router.route("/:id").delete(deleteBlog);

module.exports = router;
