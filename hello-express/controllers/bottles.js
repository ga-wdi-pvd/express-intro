module.exports = {
  index( req, res ){
    var bottles = req.params.number_of_bottles;
    var next = bottles -1;
    res.render('index', {bottles,next});
  },
  root(req, res){
    //res.render("index", {bottles: 99, next: 98});
    res.render("root");
  },
  root_post(req,res){
    console.log(req.body);
    //res.send(`hello ${req.body.player_name}`);
    res.render("index", {
      player_name: req.body.player_name,
      bottles: 99,
      next: 98
    });
  }

};
