const mongoose = require("mongoose");

module.exports.connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/carBlog");
  const db = mongoose.connection;
  db.once("open", () => {
    console.log("Database Connected");
  }).on("error", (err) => {
    console.log(err);
  });
  // mongoose.connect("mongodb://localhost:27017/carBlog")
};
