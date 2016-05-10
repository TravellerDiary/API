var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username:String,
    userid:String,
    pwd:String,
    email:String,
    phone:String,
    birth:Date,
    gender:String,
    title:String,
    country:String,
    picture:[{
       pid:Number,
       url:String
    }]
});

// UserSchema.methods.getProjects = function(){
//    return Project.find({ userid: this._id});
// };

var User = mongoose.model('User', UserSchema);
modules.export = User;
