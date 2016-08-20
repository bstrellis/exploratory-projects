var express = require('express');
var router = express.Router();

/* GET bobs page. */
router.get('/helloBob', function(req, res){
  res.render('hello-bob');
});

module.exports = router;
