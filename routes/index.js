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
router.post('/', function(req, res,next) {
  console.log("xxxxxxxxxxxxx")
  res.render('index', {mainType: 'signup', data: null})
})
router.get('/signup', check.checkNotLogin, function(req, res, next) {
  //要注册，首先要当前不是登陆状态。
  //怎么判断当前的登陆状态？就用check这个自定义的中间件
  res.render('index', {mainType: 'signup', data: null})
})
router.post('/signup', function(req, res, next) {
  // 从post数据里拿到username，password、email。
  // 先查看用户名和密码在数据库里是否已经存在。
  // 如果已经存在，返回错误提示。
  // 如果不存在，写入到数据库。
  // 然后redirect到登陆页面。
  let username = req.body.username
  let password = req.body.password
  let password2 = req.body.password2
  let email = req.body.email
  try {
    if (username.length < 3 || username.length > 50) {
      throw new Error('名字长度不对')
    } else if (password.length < 3 || password.length > 50) {
      throw new Error('密码长度不对')
    } else if (password !== password2) {
      throw new Error("两次密码不一样")
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('/signup')
  }
  res.redirect('signin')
})
router.get('/signin', check.checkNotLogin, function(req, res, next) {
  // 先判断当前是不是已经登陆的状态。
  res.render('index', {mainType: 'signin', data: null})
})
module.exports = router;
