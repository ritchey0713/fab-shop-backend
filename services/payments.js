const keys = require("../config/keys");
const Stripe = require("stripe");
const stripe = Stripe(keys.stripeSecretKey);

const paymentIntent = async () => {
  const resp = await stripe.paymentIntents.create({
    amount: null,
    currency: "usd",
    payment_method_types: ["card"],
  });
  return resp;
};

module.exports = { paymentIntent };
