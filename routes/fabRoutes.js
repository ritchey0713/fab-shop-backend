const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Fab = mongoose.model("fabRequests");

module.exports = (app) => {
  app.post("/api/requests", requireLogin, async (req, res) => {
    try {
      console.log(req.body);
      const newFabRequest = await new Fab(req.body).save();
      res.status(200).send(newFabRequest);
    } catch (err) {
      console.log("ERR", err.message);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  });
};
