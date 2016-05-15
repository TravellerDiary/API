var mongoose = require('mongoose');

var DiarySchema = new mongoose.Schema({
   userid:String, //在地圖頁面呈現用 僅會撈取日記中的照片內容
   projectid:String,
   title:String,
   date:Date,
   content:String,
   tag:[{
       descrption:String,
       money:Number
   }],  //tag用來記錄 特別要標住花費的事項和金錢
   picture:String,
   isLock:Boolean
});

var DiaryModel = mongoose.model('Diary', DiarySchema);
module.exports = DiaryModel;
