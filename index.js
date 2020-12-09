const express = require("express");
const mongoose = require("mongoose");
// require models before strats
require("./models/User");
// fire off google strategy
require("./services/passport");
const keys = require("./config/keys");
const app = express();

require("./routes/authRoutes")(app);
const PORT = process.env.PORT || 5000;

const dbConnection = async () => {
  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.log("connection failed", err.message);
    process.exit(1);
  }
};

dbConnection();
app.listen(PORT);
