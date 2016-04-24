var express = require('express');
var router = express.Router();



var userdata1 = {
    uid:'1',
    name:'王大明',
    age:'20',
    gender:'M',
    title:'旅遊家'
};


var userdata2 = {
    uid:'2',
    name:'王小明',
    age:'22',
    gender:'M',
    title:'旅遊王'
};


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('register an account');
});


router.get('/:uid',function(req,res,next){
   console.log(req.params.uid);
  //  switch(req.params.projectID){
  //    case "1":  res.json(collectiondata1); break;
  //    case "2":  res.json(collectiondata2); break;
  //  }
   if(req.params.uid =="1"){
      res.json(userdata1);
   }else if(req.params.uid == "2"){
      res.json(userdata2);
   }else{
      res.send("無此人帳戶資訊!");
   }
});
router.post('/:uid',function(req,res,next){
   res.send("新增一位使用者帳戶資訊");
});

router.put('/:uid',function(req,res,next){
  res.send("更新一位使用者帳戶資訊");
});


// router.delete('/:id',function(req,res,next){
//   res.send("delete an account");
// });

module.exports = router;
