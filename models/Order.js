const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  tokenId: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  description: String,
  cancelled_at: Boolean,
  created_at: Number,
  shipping: Object,
  currency: String,
  paymentMethod: String,
});

mongoose.model("orders", orderSchema);
