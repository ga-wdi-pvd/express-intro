var express = require("express");
var app = express();

app.listen(4000, () => {
  console.log("app listening on port 4000");
})

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/:name", (req, res) => {
  res.send(`hello ${req.params.name}`);
});
