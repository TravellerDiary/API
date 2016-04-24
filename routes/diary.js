var express = require('express');
var router = express.Router();

/* GET users listing. */

//列出某使用者所有個project的資料

/* GET users listing. */
var data = {
   pid:"1",
   title:"台北一天遊",
   data:"2016/1/1",
   content:"台北好好好好好好好玩",
   isLock:true
};
//列出某使用者所有個project的資料
router.get('/diarys', function(req, res, next) {
  //res.send("Show userid's project data <br>"+ collectiondata);
   res.json(data);
});

router.get('/diarys/:id', function(req, res, next) {
   var data ={
      pid:"1",
      name:"this is id = "+req.params.id+" data"
   }
  //res.send("Show userid's project data <br>"+ collectiondata);
   res.json(data);
});


router.post('/diarys/:id',function(req,res,next){
    var data = {
       pid:"1",
       title:"台北一天遊",
       data:"2016/1/1",
       content:"台北好好好好好好好玩",
       isLock:true
    };

    res.json(data);

});

//update a project
router.put('/diarys/:id',function(req,res,next){
  var data = {
     id:"1",
     title:"台北一天遊",
     data:"2016/1/1",
     content:"台北不不不好好玩",
     isLock:false
  };

    res.json(data);
});
//delete a project
router.delete('/diarys/:id',function(req,res,next){
    res.send("delete a diary" + req.params.diaryID);
});




module.exports = router;
