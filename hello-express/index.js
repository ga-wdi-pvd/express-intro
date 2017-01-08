var express = require("express");
var app = express();

app.listen(4000, () => {
  console.log("app listening on port 4000");
})

app.get("/", (req, res) => {
  var bottles = 9;
  display(res, bottles);  
});

app.get("/:number_of_bottles", (req, res) => {
  console.log(req.params);
  var bottles = req.params.number_of_bottles;
  if(bottles == 0){
    res.send("0 bottles of beer. <a href='/'>Start Over</a>");
  } else {
    display(res, bottles);
  }
});

function display(res, bottles) {
  html = `${bottles} bottles of beer on the wall `;
  html += `<a href='/${bottles-=1}'>take one down, pass it around</a>`;
  res.send(html);
}
