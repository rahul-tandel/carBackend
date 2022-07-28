const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  blogImage: {
    type: String,
  },
});

const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;
