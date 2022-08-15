const express = require("express");
// const { connectDB } = require("./db/mongoose");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const db = require("./db/models/index");

// connectDB();

(async () => {
  await db.sequelize.sync();
})();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/user", userRoute);
app.use("/api/user/blog", blogRoute);

app.listen(3000, () => {
  console.log("Listening on PORT 3000");
});
