const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePic: {
        type: DataTypes.TEXT,
        freezeTableName: true,
      },
      banner: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );

  User.prototype.matchPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
  };

  return User;
};
