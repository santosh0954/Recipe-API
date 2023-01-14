const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Recipe = require("./recipe");

const Process = sequelize.define(
  "process",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    step: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Process.belongsTo(Recipe, { foreignKey: "recipe_id" });

module.exports = Process;
