const config = require("config");
const jwt = require("jsonwebtoken");

function generateAuthToken(payload) {
  const token = jwt.sign(payload, config.get("jwtPrivateKey"));
  return token;
}

module.exports = {
  generateAuthToken,
};
