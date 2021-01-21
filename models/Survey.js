const mongoose = require("mongoose");
const { Schema } = mongoose;
const recipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  //recipients: [String],
  // set up child objs using recipient schema
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
});

mongoose.model("surveys", surveySchema);
