// try {
//   const { data: clientSecret } = await axios.post("/api/payment_intents", {
//     amount: price * 100,
//   });

const keys = require("../config/keys");
const Stripe = require("stripe")(keys.stripeSecretKey);
const payment = require("../services/payments");

module.exports = (app) => {
  app.post("/api/stripe", async (req, res) => {
    try {
      const { amount } = req.body;
      const paymentToken = await payment.paymentIntent(amount);
      res.status(200).send(paymentToken.client_secret);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  });
};
