const express = require("express");
const {
  getBlog,
  postBlog,
  getSingleBlog,
  editBlog,
  deleteBlog,
  getAllBlogs,
  getBlogCard,
} = require("../controllers/blog");

const router = express.Router();

router.route("/all/").get(getAllBlogs);
router.route("/:id").get(getBlog);
router.route("/").post(postBlog);
router.route("/u/:id").get(getSingleBlog);
router.route("/:id").put(editBlog);
router.route("/:id").delete(deleteBlog);
router.route("/card/data").get(getBlogCard);

module.exports = router;
