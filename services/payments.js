const keys = require("../config/keys");
const Stripe = require("stripe");
const stripe = Stripe(keys.stripeSecretKey);

const paymentIntent = await stripe.paymentIntents.create({});
