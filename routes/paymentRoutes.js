const mongoose = require("mongoose");
// const keys = require("../config/keys");
const payment = require("../services/payments");
const Order = mongoose.model("orders");

module.exports = (app) => {
  app.post("/api/stripe", async (req, res) => {
    try {
      const { amount } = req.body;
      // console.log(req.session.user.id);
      const paymentToken = await payment.paymentIntent(amount);
      const paymentObj = {
        tokenId: paymentToken.id,
        amount: paymentToken.amount,
        userId: req.session._ctx.user.id,
        cancelledAt: paymentToken.cancelled_at,
        description: paymentToken.description,
        created_at: paymentToken.created_at,
        shipping: paymentToken.shipping,
        currency: paymentToken.currency,
        paymentMethod: paymentToken.payment_method,
      };
      const newOrder = await new Order(paymentObj).save();
      res
        .status(200)
        .send({ secret: paymentToken.client_secret, order: newOrder });
    } catch (err) {
      console.log("ERR", err.message);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  });
};
