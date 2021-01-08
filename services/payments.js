const keys = require("../config/keys");
const Stripe = require("stripe");
const stripe = Stripe(keys.stripeSecretKey);

const paymentIntent = async (amount) => {
  const resp = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  return resp;
};

module.exports.paymentIntent = paymentIntent;
