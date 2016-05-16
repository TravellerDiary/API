var express = require('express');
var router = express.Router();

var User = require('../model/users.js');

//here is viewmodel and api router @@

//將Model中的 Project schema 給綁到這裡來
User.find(function(err, res){
  console.log("bind User schema success");
});
router.get('/user',function(req,res,next){
  User.find( {}   ,function(err,users){
    if(err) console.log("error");
    else{
       console.log("user get successfully");
       console.log(users);
       var UserMap = {};
          users.forEach(function(user) {
            console.log(user);

            UserMap[user._id] = user;
          });
          res.send(UserMap);
    }
  });
});

router.get('/user/:uid',function(req,res,next){
  User.find( {uid:req.params.uid}   ,function(err,users){
    if(err) console.log("error");
    else{
       console.log("user get successfully");
       var UserMap = {};
          users.forEach(function(user) {
            console.log(user);

            UserMap[user._id] = user;
          });
          res.send(UserMap);
    }
  });
});
router.post('/user/',function(req,res,next){
      console.log("test");
      var Userdata = new User({
          username:req.body.name,
          uid:req.body.uid,
          pwd:req.body.pwd,
          email:req.body.email,
          birth:req.body.birth,
          gender:req.body.gender,
          level:`冒險家`,
          country:req.body.country,
          headPic:"..."
      }).save(function(err,result){
         if(err){
           console.log(err);
         }else{
            var data = {
               id : result._id,
               uid : result.uid,
               username:result.username,
               pwd:result.pwd,
               email:result.email,
               birth:result.birth,
               gender:result.gender,
               level:result.level,
               country:result.country,
               headPic:result.headPic
            }
            res.json(data);
         }
      });
      console.log('create a new user: ');
});

router.put('/user/:uid',function(req,res,next){
console.log("test");

  var query = {uid:req.params.uid};
  var newData = {
     username : req.body.username,
     pwd : req.body.pwd,
     email : req.body.email,
     birth : req.body.birth,
     gender: req.body.gender,
     level: req.body.level,
     country: req.body.country,
     headPic: req.body.headPic
  };
  //注意 是_id 不是 pid 囧   new:true 回傳 新版更改好的資料
  //利用mongoose抓回來的資料 用doc 取代 res
  User.findOneAndUpdate(query,{$set:newData},{new:true}, function(err, doc){
      if(err){
        console.log(err);
      }else{
        console.log("update a user successfully");
        console.log(doc);
        var result = {
            username:doc.username,
            uid:doc.uid,
            pwd:doc.pwd,
            email:doc.email,
            birth: doc.birth,
            gender: doc.gender,
            level: doc.level,
            country: doc.country,
            headPic: doc.headPic
        };
        res.json(result);
      }
  });
});

//delete a project
// router.delete('/user/:uid',function(req,res,next){
//
//    Project.remove({ _id: req.params.uid }, function(err) {
//       if(err) message.type = 'notification!';
//       else {
//           res.send("delete a user success");
//       }
//    });
//
// });


// router.delete('/:id',function(req,res,next){
//   res.send("delete an account");
// });

module.exports = router;
