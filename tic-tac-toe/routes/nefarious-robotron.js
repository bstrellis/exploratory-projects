var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('01010010011100110 You will die, human weakling. 0101010010101');
});

module.exports = router;
