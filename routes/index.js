var express = require('express');
var router = express.Router();
var dataModel = require('../models/data-models')
var check = require('../middlewares/check')
/* GET home page. */
router.get('/', function(req, res, next) {
  // read data from db
  dataModel.readTable('posts', function(data) {
    console.log(data)
    res.render('index', { data: data, mainType: 'posts' });
  })
  
});
router.get('/signup', check.checkNotLogin, function(req, res, next) {
  //要注册，首先要当前不是登陆状态。
  //怎么判断当前的登陆状态？就用check这个自定义的中间件
  res.render('index', {mainType: 'signup', data: null})
})
module.exports = router;
