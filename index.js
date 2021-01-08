const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// require models before strats
require("./models/User");
// fire off google strategy
require("./services/passport");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    // 30 days before expire
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/paymentRoutes")(app);
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
