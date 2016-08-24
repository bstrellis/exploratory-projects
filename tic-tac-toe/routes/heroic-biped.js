var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {

  // get data from body about which box was clicked
  // change that boxs handlebars to x
  // render index with new data

  res.send('I will fight the robot!');
});

module.exports = router;
