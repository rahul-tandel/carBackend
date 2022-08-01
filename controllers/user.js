const userSchema = require("../db/models/user");

module.exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await userSchema.find({ _id: id });
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
  const user = await userSchema
    .findOne({ username: username })
    .select(["password"]);
  if (!user) {
    res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  } else {
    const isMatch = await user.matchPassword(password);
    const userData = await userSchema.find({ username: username });
    if (isMatch) {
      res.status(200).json({
        success: true,
        user: userData,
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
  try {
    const updatedUser = await userSchema.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userSchema.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};
