const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.send({ hello: "goodbye" });
});

app.listen(5000);
