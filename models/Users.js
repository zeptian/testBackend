const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:['admin','user'],default:'user'}
},{
    timeseries:true
})
UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
   }
module.exports = mongoose.model('Users',UserSchema);