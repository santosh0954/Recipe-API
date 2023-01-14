var express = require("express");
var router = express.Router();
const Recipe = require("../model/recipe");
const Ingredient = require("../model/ingredients");
const Process = require("../model/process");
const Joi = require("joi");
const User = require("../model/user");
const auth = require('../middleware/auth');

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({raw: true});
    if (recipes.length < 0)
      return res.status(404).send({ error: "Recipe not found." });
    res.send({ error: null, data: { recipes } });
  } catch (error) {
    res.status(400).send({ error });
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    // checking id is valid or not
    const { id } = req.params;
    // console.table(id)
    // fetching recipe
    const recipe = await Recipe.findAll({ where: { id }, raw: true });
    const user = await User.findAll({where: {id: recipe[0].creator_id}, attributes: {exclude: ['password']}});
    console.log(recipe);

    if (recipe.length < 1 || isNaN(id))
      return res.status(400).send({ error: "Recipe id not found." });

    // fetching ingredients and process as well using given recipe data
    const ingredients = await Ingredient.findAll({ where: { recipe_id: id } });
    const processes = await Process.findAll({ where: { recipe_id: id } });
    // console.log(ingredients)
    // console.log(processes)

    res.send({ error: null, user, data: { recipe: recipe[0], ingredients, processes } });
  } catch (error) {
    res.status(400).send({ error });
  }
});
router.post("/", auth, async (req, res, next) => {
  const { name, description, imageUrl, creator_id } = req.body;
  const { error } = validateRecipe(req.body);
  if (error) return res.status(400).send({ error: error.details });
  try {
    await Recipe.create({
      name,
      description,
      imageUrl,
      creator_id,
    });
    res.send({ error: null, success: true });
  } catch (error) {
    res.status(400).send({ error });
  }
});

function validateRecipe(recipe) {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().min(50).required(),
    imageUrl: Joi.string().required(),
    creator_id: Joi.number().required(),
  });
  return schema.validate(recipe);
}

module.exports = router;
