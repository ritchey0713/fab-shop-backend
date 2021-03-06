const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// require models before strats
require("./models/User");
require("./models/Order");
require("./models/Fab");
require("./models/Survey");
// fire off google strategy
require("./services/passport");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

const app = express();
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

app.all("/*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

require("./routes/authRoutes")(app);
require("./routes/paymentRoutes")(app);
require("./routes/fabRoutes")(app);
require("./routes/surveyRoutes")(app);
const PORT = process.env.PORT || 5000;

const dbConnection = async () => {
  try {
    const data = await mongoose.connect(keys.mongoURI, {
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
