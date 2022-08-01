const express = require("express");
const {
  getUser,
  postUser,
  authenticateUser,
  updateUser,
  getAllUsers,
} = require("../controllers/user");

const router = express.Router();

router.route("/:id").get(getUser);
router.route("/").post(postUser);
router.route("/login").post(authenticateUser);
router.route("/:id").put(updateUser);
router.route("/").get(getAllUsers);

module.exports = router;

// router.get('/',(req,res) => {

// })
