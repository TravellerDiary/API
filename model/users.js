var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username:String,
    uid:String,
    pwd:String,
    email:String,
    birth:Date,
    gender:String,
    level:String,
    country:String,
    headPic:String
});

// UserSchema.methods.getProjects = function(){
//    return Project.find({ userid: this._id});
// };

var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
