var express = require('express');
var router = express.Router();

var Project = require('../model/projects.js');

//here is viewmodel and api router @@

//將Model中的 Project schema 給綁到這裡來
Project.find(function(err, res){
  console.log("bind Project schema success");
});

router.get('/:uid/projects/', function(req, res, next) {
   Project.find( {userid:req.params.uid}   ,function(err,projects){
     if(err) console.log("error");
     else{
        console.log("project get successfully");
        var projectMap = {};
           projects.forEach(function(project) {
             console.log(project);

             projectMap[project._id] = project;
           });
           res.send(projectMap);
     }
   });
});


router.post('/:uid/projects/',function(req,res,next){

    var projectdata = new Project({
        userid:req.params.uid,
        title:req.body.title,   //req.body.title
        startDate:req.body.startDate, //req.body.startDate
        endDate:req.body.endDate,  //req.body/endDate
        picture:'null'
    }).save(function(err,result){
       if(err){
         console.log(err);
       }else{
          var data = {
             pid : result._id,
             title : result.title,
             startDate : result.startDate,
             endDate: result.endDate,
          }
          res.json(data);
       }
    });
    console.log('create a new project: ');

});

//update a project
router.put('/:uid/projects/:pid',function(req,res,next){
    var query = {_id:req.params.pid};
    var newData = {
       title : req.body.title,
       startDate : req.body.startDate,
       endDate : req.body.endDate,
       picture : req.body.picture
    };
    //注意 是_id 不是 pid 囧   new:true 回傳 新版更改好的資料
    //利用mongoose抓回來的資料 用doc 取代 res
    Project.findOneAndUpdate(query,{$set:newData},{new:true}, function(err, doc){
        if(err){
          console.log(err);
        }else{
          console.log("update successfully");
          console.log(doc);
          var result = {
             title: doc.title,
             startDate: doc.startDate,
             endDate: doc.endDate,
             picture: doc.picture
          };
          res.json(result);
        }
    });
});
//delete a project
router.delete('/:uid/projects/:pid',function(req,res,next){

   Project.remove({ _id: req.params.pid }, function(err) {
      if(err) message.type = 'notification!';
      else {
          res.send("success");
      }
   });

});


module.exports = router;
