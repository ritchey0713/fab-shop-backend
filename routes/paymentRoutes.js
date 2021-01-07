// try {
//   const { data: clientSecret } = await axios.post("/api/payment_intents", {
//     amount: price * 100,
//   });

const keys = require("../config/keys");
const Stripe = require("stripe")(keys.stripeSecretKey);
const paymentIntent = require("../services/payments");

module.exports = (app) => {
  app.post("/api/payment_intents", async (req, res) => {
    console.log(req.body, "RES");
  });
};
