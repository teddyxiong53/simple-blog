var express = require('express');
var router = express.Router();
var dataModel = require('../models/data-models')
var check = require('../middlewares/check')
// var sha1 = require('sha1')
// 调试，把这个不加密。
var sha1 = function(password) {
  return password
}
/* GET home page. */
router.get('/', function(req, res, next) {
  // read data from db
  dataModel.readTable('posts', function(data) {
    // console.log(data)
    // 
    // console.log(req.session.user.username)
    res.render('index', { params: {
      mainType: 'posts',
      user: req.session.user,
      data: data
    } });
  })
  
});

router.get('/signup', check.checkNotLogin, function(req, res, next) {
  //要注册，首先要当前不是登陆状态。
  //怎么判断当前的登陆状态？就用check这个自定义的中间件
  res.render('index', { params: {
    mainType: 'signup',
    user: null,
    data: null
  } })
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
    } else if (password.length < 1 || password.length > 50) {
      throw new Error('密码长度不对')
    } else if (password !== password2) {
      throw new Error("两次密码不一样")
    } 
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('/signup')
  }
  //开始准备往数据库里保存
  dataModel.insertRow('users', {
    username,
    password: sha1(password),
    email,
    avatar: ""
  }, function() {
    console.log("insert finish")
    res.redirect('/signin')
  })
  
})
router.get('/signin', check.checkNotLogin, function(req, res, next) {
  // 先判断当前是不是已经登陆的状态。
  res.render('index', { params: {
    mainType: 'signin',
    user: null,
    data: null
  } })
})

router.post('/signin', function(req, res, next) {
  let username = req.body.username
  let password = req.body.password
  try {
    //从数据库查询用户。
    //名字和密码都匹配
    // 先找用户
    dataModel.queryRow('users', {username}, function(rows) {
      if (rows.length >= 1) {
        let usernameDb = rows[0].username
        let passwordDb = rows[0].password
        if (usernameDb === username) {
          if (sha1(password) === passwordDb) {
            //用户名和密码都对
            
            // req.flash('success', 'test flash')
            // console.log(`222 ${JSON.stringify(req.session)}`)
          } else {
            throw new Error("密码错误")
          }
        } else {
          throw new Error("用户名不存在")
        }
      } else {
        throw new Error("用户名不存在")
      }
    })
  } catch(e) {
    req.flash('error', e.message)
    res.redirect('/signin')
    return
  }
  req.session.user = {
    username,
  }
  res.redirect('/')
})

module.exports = router;
