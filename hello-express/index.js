var express = require("express");
var bodyParser = require("body-parser");
var bottles = require("./controllers/bottles.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'))

app.set("view engine", "hbs");

app.listen(4000, () => {
  console.log("app listening on port 4000");
})

app.get("/", bottles.root);
app.get("/:number_of_bottles?", bottles.index);

app.post("/", bottles.root_post);
