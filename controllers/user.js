const userSchema = require("../db/models/user");
const {
  models: { User },
} = require("../db/models/index");

module.exports.postUser = async (req, res) => {
  if (req.body.username && req.body.password) {
    const user = await User.create(req.body);
    res.send(user);
  } else {
    res.send("Something went wrong");
  }
};

module.exports.getUser = async (req, res) => {
  // console.log("sd");
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports.authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({
      success: false,
      message: "Please Enter email address and Password",
    });
  }
  const user = await User.findOne({ where: { username: username } });
  if (!user) {
    res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  } else {
    // console.log(User);
    const isMatch = await user.matchPassword(password, user.password);
    // const userData = await userSchema.find({ username: username });
    if (isMatch) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  }
};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  // console.log(req.body.profilePic.length);
  try {
    const updatedUser = await User.update(body, { where: { id: id } });
    if (updatedUser) {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};
