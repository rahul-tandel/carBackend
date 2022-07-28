const express = require("express");
const { getUser, postUser, authenticateUser } = require("../controllers/user");

const router = express.Router();

router.route("/").get(getUser);
router.route("/").post(postUser);
router.route("/login").post(authenticateUser);
module.exports = router;

// router.get('/',(req,res) => {

// })
