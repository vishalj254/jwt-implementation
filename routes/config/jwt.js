const expressJwt = require("express-jwt");
const config = require("../../nodemon.json");

function jwt() {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      "/users/authenticate",
    ],
  });
}

module.exports = jwt;
