var mongoose = require('mongoose');

var ProjectsSchema = new mongoose.Schema({
   userid:String,
   title:String,
   startDate:Date,
   endDate:Date,
   picture:String
   //這邊 不能有diary的資料  必須要另外用diary 的model在裡面包含projecot的id才行
});

var ProjectModel = mongoose.model('Project', ProjectsSchema);
module.exports = ProjectModel;
