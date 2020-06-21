var express = require("express");
var router = express.Router();
const config = require("../nodemon.json");
const jwt = require("jsonwebtoken");
const users = [
  {
    id: 1,
    username: "test",
    password: "test",
    firstName: "Test",
    lastName: "User",
  },
];

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const data = await users.map((u) => omitPassword(u));
  res.status(200).json({ data });
});

router.post("/authenticate", function (req, res, next) {
  const { username, password } = req.body;
  try {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return res.status(500).json({ msg: "Username or password is incorrect" });
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      ...omitPassword(user),
      token,
    });
  } catch (err) {
    next();
  }
});

/* helper functions. */

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

module.exports = router;
