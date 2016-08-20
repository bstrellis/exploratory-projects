var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res){
  var data = {
    town: "FUCK YOU HANDLEBARS"
  };
  res.render('main', data);
});

module.exports = router;
