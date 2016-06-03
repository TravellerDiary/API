var express = require('express');
var Diary = require('../model/diarys.js');

var router = express.Router();

//here is viewmodel and api router @@
//  /api/:pid/diarys/ 這樣似乎不行
Diary.find(function(err, res){
  console.log("bind diary schema success");
});

router.get('/:uid/:pid/diarys/', function(req, res, next) {
  Diary.find({projectid:req.params.pid},function(err,diarys){
    if(err) console.log("error");
    else{
       console.log("diary get successfully");
      //  var diaryMap = {};
      //     diarys.forEach(function(diary) {
      //       diaryMap[diary._id] = diary;
      //     });
      //     res.send(diaryMap);
      // }

      var diaryMap = {};
         diarys.forEach(function(diary) {
           diaryMap[diary._id] = {
               did: diary._id,
               title:diary.title,
               date:diary.date,
               picture: diary.picture
           };
         });
      res.send(JSON.stringify(diaryMap));
    }
  });
});
//再行程由 pid 中新增日記
router.post('/:uid/:pid/diarys/',function(req,res,next){

      var diaryData = new Diary({
          userid:req.params.uid,
          projectid:req.params.pid,
          title:req.body.title,   //req.body.title
          date:req.body.date, //req.body.startDate
          tag:[{
             descrption:"目前尚無標籤",
             money:'0'
          }],
          picture:req.body.picture,  //封面照
          isLock:req.body.isLock
      }).save(function(err,result){
         if(err){
           console.log(err);
         }else{
            console.log(result._id);
            var data = {
               diaryid : result._id,
               title : result.title,
               date : result.date,
               picture: result.picture,
               tag:result.tag,
               isLock: result.isLock
            };
            res.json(data);
         }
      });
      console.log('create a new diary! ');
});

//update a project
router.put('/:uid/:pid/diarys/:did',function(req,res,next){
  var query = { _id:req.params.did };
  var newData = {

    title:req.body.title,
    date:req.body.date,
    content:req.body.content,
    picture:req.body.picture,
    isLock:req.body.isLock
  };

  Diary.findOneAndUpdate(query,{$set:newData},{new:true}, function(err, doc){
      if(err){
        console.log(err);
      }else{
        console.log("update diary successfully");
        console.log(doc);
        var result = {
           title: doc.title,
           date: doc.date,
           content: doc.content,
           picture: doc.picture,
           isLock: doc.isLock
        };
        res.json(result);
      }
  });

    res.json(data);
});
//delete a project
router.delete('/:uid/:pid/diarys/:did',function(req,res,next){

  Diary.remove({ _id: req.params.did }, function(err) {
    if(err) message.type = 'notification!';
    else {
        res.send("delete diary success");
    }
  });
});




module.exports = router;
