const blogSchema = require("../db/models/blog");

module.exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await blogSchema.find({ user_id: id });
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
};

module.exports.postBlog = async (req, res) => {
  try {
    const blog = req.body;
    const createdBlog = await blogSchema.create(blog);
    res.json(createdBlog);
  } catch (error) {
    console.log(error);
  }
};
