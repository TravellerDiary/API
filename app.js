// vhttp.createServer(onRequest).listen(3000);  //開啟server 並執行onRequest()
// console.log("Server has started to listen at port: 3000.");
var http = require('http');
var url = require('url');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var index = require('./routes/index');
var project = require('./routes/project');
var diary = require('./routes/diary.js');
var user = require('./routes/user.js');
//var fortune = require('./lib/fortune.js');


//====================app 配置 ==================

var server = http.createServer(app);
server.listen(8080,'0.0.0.0',function(){
    console.log('HTTP伺服器在 http://0.0.0.0:8080/ 上運行');
});

//==============app session=======================
var session = require('express-session');
app.use(session({
  secret: 'recommand 128 bytes random string', // 建議使用 128 个字符的随機字符串
  cookie: { maxAge: 600 * 1000 }
}));
//=================URL========================
app.use('/', index); //路由為 index
//app.use('/user',user);
app.use('/api',project);
app.use('/api',diary);
app.use('/api',user);
// app.use('/collection', collection); //路由為collection
// app.use('/collection/project', project);
// app.use('/collection/project/diary', diary);


//==============view engine setup================================
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views')));


//===================connected to the MongoDB============================

var mongo = require('mongodb');
var mongoose = require('mongoose');

var db = require('./db.js');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database Connected.");
});

//==========================================

//記錄當前使用者選擇的專案cookie
app.post('/toDiaryPage',function(req,res){
   req.session.pid = req.body.pid;
   console.log("save project id success ,session pid is " + req.session.pid);

   res.send("OK");
});

app.get('/diarys',function(req,res){
  res.render('diary.html');
});


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers
// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// module.exports = app;
//====================undefined area=====================

app.get('/newsletter',function(req,res){
  res.render('newsletter',{csrf: "CSRF token goes here"});
});

app.post('/process',function(req,res){
   console.log('Form (from querystring):' + req.query.form);
   console.log('CSRF token (from hidden form field): ' + req.body._csrf);
   console.log('Name (from visible from field):' + req.body.name);
   console.log('Email (from visible form field):' + req.body.email);
   res.redirect(303, '/thank-you');
});

app.post('/process', function(req,res){
  if(req.xhr || req.accepts('json,html') === 'json'){
    res.send({success : true});
  }else {
    res.redirect(303);
  }
});
