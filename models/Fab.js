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
});

mongoose.model("fabRequests", fabSchema);
