const express = require('express');
const router = express.Router();

let board = {
  boxes: ['',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  ''],
  isRobotronsMove: false
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', board);
});

// Update board after humanoid move
router.post('/', function(req, res, next) {
  board.boxes[req.body.indexClicked] = 'humanoid';
  res.render('index', board);
});


module.exports = router;

// TODO THIS COMMIT
/*
ALL JS IN ES6 THROUGHOUT - no var at all!
*****
post requests to nefarious robotron and heroicbiped
return altered board
no longer possible to click occupied squares
detects end of game and determines champion
convert all js to es6!!
*/
