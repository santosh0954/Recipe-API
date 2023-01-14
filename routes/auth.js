var express = require("express");
var router = express.Router();
const Joi = require("joi");
const jwt = require('../utils/jwt');

const User = require("../model/user");


router.post("/", async (req, res, next) => {
  const { userId, password } = req.body;
  console.log(userId, password)
  // validating user
  const { error } = validateUser(req.body);
  if (error) return res.status(403).send({ error: error.details });
  try {
    // Check userId exist or not
    const user = await User.findAll({
      where: { userId }, raw: true
    });
    if (user.length < 1)
      return res.send({ error: "Invalid UserId and Password" });
      if(user[0].password !== password) {
      return res.send({ error: "Invalid UserId and Password" });

    }
    // console.log(user);
   const token = jwt.generateAuthToken(user[0])
    res.send(token);
   
  } catch (error) {
    res.send({ error });
  }
});

function validateUser(user) {
  const schema = Joi.object({
    userId: Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}

module.exports = router;
