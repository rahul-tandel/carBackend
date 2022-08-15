const blogSchema = require("../db/models/blog");
const userSchema = require("../db/models/user");

const {
  models: { Blog, User },
} = require("../db/models/index");

module.exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await Blog.findAll({ where: { user_id: id } });
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
};

module.exports.postBlog = async (req, res) => {
  try {
    const blog = req.body;
    const createdBlog = await Blog.create(blog);
    res.json(createdBlog);
  } catch (error) {
    console.log(error);
  }
};

module.exports.editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedBlog = await Blog.update(body, { where: { id: id } });
    if (updatedBlog) {
      const user = await Blog.findByPk(id);
      res.status(200).json(updatedBlog);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.destroy({ where: { id: id } });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: id });
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogSchema.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getBlogCard = async (req, res) => {
  try {
    const blogs = await Blog.findAll({ include: User });
    // const data = [];
    // let shuffledBlogs = blogs.sort(() => 0.5 - Math.random());
    // shuffledBlogs = shuffledBlogs.slice(0, 6);
    // for (let a of shuffledBlogs) {
    //   const user = await User.findByPk(a.user_id);
    //   a.dataValues.profilePic = user.profilePic;
    //   data.push(a);
    // }

    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
};
