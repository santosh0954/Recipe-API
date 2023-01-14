var express = require("express");
const Joi = require("joi");
const jwt = require('../utils/jwt');
const User = require("../model/user");

var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.send({ error: null, data: [{ users }] });
  } catch (error) {
    res.status(404).send({ error: "Not Found", data: [] });
  }
});
router.post("/", async (req, res, next) => {
  const { name, userId, password } = req.body;

  // validating user
  const { error } = validateUser(req.body);
  if (error) return res.status(403).send({ error: error.details });
  try {
    // Check userId exist or not
    const user = await User.findAll({
      attributes: { exclude: ["password"] },
      where: { userId }, raw: true
    });
    if (user.length > 0)
      return res.send({ error: "User Id already exist" });
    const response = await User.create({
      name,
      userId,
      password,
    });
    console.log(response);
    const token = jwt.generateAuthToken(response.dataValues)
    res.header('x-auth-token', token).send({ error: null, success: true });
  } catch (error) {
    res.send({ error });
  }
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    userId: Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
    password2: Joi.ref("password"),
  });
  return schema.validate(user);
}

module.exports = router;
