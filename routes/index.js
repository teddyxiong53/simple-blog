var express = require('express');
var router = express.Router();
var dataModel = require('../models/data-models')
/* GET home page. */
router.get('/', function(req, res, next) {
  // read data from db
  dataModel.readTable('posts', function(data) {
    console.log(data)
    res.render('index', { data: data, mainType: 'posts' });
  })
  
});

module.exports = router;
