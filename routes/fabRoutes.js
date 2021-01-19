const requireLogin = require("../middlewares/requireLogin");
const Fab = require("../models/Fab");

module.exports = (app) => {
  app.post("/api/requests", requireLogin, (req, res) => {
    try {
      console.log(req.body);
    } catch (err) {
      console.log("ERR", err.message);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  });
};
