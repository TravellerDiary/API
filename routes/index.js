var express = require('express');
var router = express.Router();
//若/後面沒有檔案裡面預先定義的  都會統一直接到 根目錄/
/* GET home page. */

router.get('/', function(req, res) {

  res.render('index.html');  
  // render表示對index.hjs這個模板進行編譯 並變數title值設定為Express然後再index上顯示title = "express" 很適合用在會員登入
  // res.sendFile('index.html');
  // console.log(req.params);

  // var x = req.query.id;
  // console.log(x);
  // res.render('index', {name: x});
});

module.exports = router;

//===============for traveldiry page====================

//這邊用來抓取login 表單post的資訊 然後傳值到專案遊collection頁面
// router.get('/login', function(req,res){
//    res.render('login',{title:'Here is login page'});
// });

// //從首頁跳轉到註冊畫面
// router.get('/register', function(req,res){
//   res.render('register',{title:'Here is register page'});
// });

//login頁面 的登入API
// router.get('/collection', function(req,res){
//   res.render('collection');
// });
