const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const requireCredits = require("../middlewares/requireCredits");
const Fab = mongoose.model("fabRequests");

module.exports = (app) => {
  app.post("/api/requests", requireLogin, requireCredits, async (req, res) => {
    try {
      const newFabRequest = await new Fab(req.body).save();
      res.status(200).send(newFabRequest);
    } catch (err) {
      console.log("ERR", err.message);
      res.status(422).json({ statusCode: 500, message: err.message });
    }
  });
};
