var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // if board hasn't loaded before, load.
  // i guess i have to figure out how to do that

  var board = {
    boxes: ['robotron', 7, 'humanoid', undefined, 7, undefined, undefined, undefined, undefined]
  };

  res.render('index', board);
});

module.exports = router;

// TODO THIS COMMIT
/*
ALL JS IN ES6 THROUGHOUT - no var at all!
*****
html/handlebars for header, board, button
button should only show after player has moved
post requests to nefarious robotron and heroicbiped return altered board
no longer possible to click occupied squares
detects end of game and determines champion
*/
