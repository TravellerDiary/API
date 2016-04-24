var express = require('express');
var router = express.Router();

/* GET users listing. */
var data = {
   pid:"1",
   title:"台灣環島行",
   startDate:"2016/1/1",
   endDate:"2016/1/7"
};
//列出某使用者所有個project的資料
router.get('/projects', function(req, res, next) {
  //res.send("Show userid's project data <br>"+ collectiondata);
   res.json(data);
});

router.get('/projects/:pid', function(req, res, next) {
  var data ={
     pid:"1",
     name:"this is pid = "+req.parms.pid+" data"
  }
  //res.send("Show userid's project data <br>"+ collectiondata);
   res.json(data);
});


router.post('/projects',function(req,res,next){
    var data = {
       pid:"1",
       title:"台灣環島行",
       startDate:"2016/1/1",
       endDate:"2016/1/7"
    };

    res.json(data);

});

//update a project
router.put('/projects/:pid',function(req,res,next){
    var data = {
      pid:"1",   //將資料庫建立出來的ID 回傳給前端
      title:"美國環島行",
      startDate:"2016/1/1",
      endDate:"2016/12/1"
    };

    res.json(data);
});
//delete a project
router.delete('/projects/:pid',function(req,res,next){
    res.send("delete a diary" + req.params.pid);
});


module.exports = router;
