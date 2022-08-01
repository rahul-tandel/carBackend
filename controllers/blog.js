const blogSchema = require("../db/models/blog");
const userSchema = require("../db/models/user");

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

module.exports.editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedBlog = await blogSchema.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await blogSchema.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogSchema.findOne({ _id: id });
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
    const blogs = await blogSchema.find().lean();
    const data = [];
    let shuffledBlogs = blogs.sort(() => 0.5 - Math.random());
    shuffledBlogs = shuffledBlogs.slice(0, 6);
    for (let a of shuffledBlogs) {
      const user = await userSchema.findById(a.user_id);
      a.profilePic = user.profilePic;
      data.push(a);
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
};
