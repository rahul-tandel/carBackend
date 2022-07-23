const userSchema = require("../db/models/user");

module.exports.getUser = async (req, res) => {
  try {
    const users = await userSchema.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports.postUser = async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await userSchema.create(user);
    res.status(200).json(createdUser);
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
  const user = await userSchema.findOne({ username }).select("password");
  if (!user) {
    res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  } else {
    const isMatch = await user.matchPassword(password);
    if (isMatch) {
      res.status(200).json({
        success: true,
        // user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  }
};
