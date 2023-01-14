const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Recipe = require("./recipe");

const Ingredient = sequelize.define(
  "ingredient",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Ingredient.belongsTo(Recipe, { foreignKey: "recipe_id" });

module.exports = Ingredient;

// }
