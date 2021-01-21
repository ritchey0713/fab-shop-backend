const mongoose = require("mongoose");
const { Schema } = mongoose;

const fabSchema = new Schema({
  title: String,
  date: Date,
  price: String,
  material: String,
  isStructural: Boolean,
  units: Number,
  notes: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("fabRequests", fabSchema);
