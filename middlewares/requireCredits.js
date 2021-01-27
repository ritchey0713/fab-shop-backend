const { cookieKey } = require("../config/prod");

module.exports = (req, res, next) => {
  // console.log(req.user.credits < 1);
  if (req.user.credits < 1) {
    return res.status(403).send({ error: "You need to buy credits!" });
  }
  next();
};
