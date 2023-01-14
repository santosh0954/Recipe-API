const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./user");

const Recipe = sequelize.define(
  "recipe",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, createdAt: true, updatedAt: false }
);
Recipe.belongsTo(User, { foreignKey: "creator_id" });

module.exports = Recipe;
