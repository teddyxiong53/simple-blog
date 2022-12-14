var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var router = require('./routes/index');
var flash = require('connect-flash')

var FileStore = require('session-file-store')(session);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中间件设置
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: "simple-blog",
  secret: "123456",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600*1000
  },
  store: new FileStore()
}));
app.use(flash())


// 添加全局变量
app.locals.blog = {
  title: 'SimpleBlog'
}
// 添加模板需要的变量
app.use(function(req, res, next) {
  console.log(`111 ${JSON.stringify(req.session)}`)
  // res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})
//路由设置
app.use('/', router);

//错误处理
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
