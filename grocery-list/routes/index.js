var express = require('express');
var router = express.Router();

var data = {
  groceries: ["a big plate of yak noodles",
              "a huge bowl of squid juice",
              "at least one pickled goat brain"]
};

/* GET home page. */
router.get('/', function(req, res){
  res.render('main', data);
});

// POST a change to the list
router.post('/', function(req, res){
  data.groceries.unshift(req.body.item);
  // this is working
  console.log(data.groceries);
  res.redirect('/success');
});

module.exports = router;
