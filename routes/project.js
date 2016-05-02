var express = require('express');
var router = express.Router();
var Project = require('../model/projects.js');
/* GET users listing. */

//here is viewmodel and api router @@

//將Model中的 Project schema 給綁到這裡來
Project.find(function(err, res){
  console.log("bind Project schema success");
});

var data = {
   pid:"1",
   title:"台灣環島行",
   startDate:"2016/1/1",
   endDate:"2016/1/8888"
};
//列出某使用者所有個project的資料
// router.get('/projects', function(req, res, next) {
//   //res.send("Show userid's project data <br>"+ collectiondata);
//
//    res.json(data);
// });

router.get('/projects/', function(req, res, next) {
   Project.find({userid:'sos987987'},function(err,projects){
     if(err) console.log("error");
     else{
        console.log("project get successfully");
        var projectMap = {};

           projects.forEach(function(project) {
             projectMap[project._id] = project;
           });

           res.send(projectMap);

     }
   });
});


router.post('/projects/',function(req,res,next){

    var projectdata = new Project({
        userid:'sos987987',
        title:'sos987987',
        startDate:'2016/1/1',
        endDate:'2016/12/1',
        picture:'beautiful pic',
    }).save(function(err,result){
       if(err) console.log(err);
       else{
          console.log(result._id);
          var data = {
             pid : result._id,
             title : result.title,
             startDate : result.startDate,
             endDate: result.endDate,
             test: "Testing"
          }
          res.json(data);
       }

    });
    console.log('create a new project: ' + req.body.title);

});

//update a project
router.put('/projects/:pid',function(req,res,next){
    // http://127.0.0.1:8080/api/projects/57275c30ed9fd284103bf57a
    var newData = {
      title : '台灣好好玩',
      startDate : '2016/2/2',
      endDate : '2016/2/20'
    }
    //注意 是_id 不是 pid 囧   new:true 回傳 新版更改好的資料
    //利用mongoose抓回來的資料 用doc 取代 res
    Project.findOneAndUpdate({_id:req.params.pid},{$set:newData},{new:true}, function(err, doc){
        if(err)
          console.log(err)
        else{
          console.log("update successfully");
          console.log(doc);
          var result = {
             title: doc.title,
             startDate: doc.startDate,
             endDate: doc.endDate
          }
          res.json(result);
        }
    });
});
//delete a project
router.delete('/projects/:pid',function(req,res,next){

    Project.remove({ _id: req.params.pid }, function(err) {
      if(err) message.type = 'notification!';
      else {
          res.send("delete success");
      }
  });

});


module.exports = router;
