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
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
});

mongoose.model("surveys", surveySchema);
