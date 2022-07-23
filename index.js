const express = require("express");
const { connectDB } = require("./db/mongoose");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/user/blog", blogRoute);

app.listen(3000, () => {
  console.log("Listening on PORT 3000");
});
