const Sequlize = require("sequelize");
const dbConfig = require("../db.config");

const sequelize = new Sequlize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
  }
);

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.User = require("./user")(sequelize, Sequlize.DataTypes);
db.models.Blog = require("./blog")(sequelize, Sequlize.DataTypes);

db.models.User.hasMany(db.models.Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

db.models.Blog.belongsTo(db.models.User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = db;
