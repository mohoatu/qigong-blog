// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  emailUser: String,
  codeUser: String,
  registerStatus: String,
  fName:String,
  lName:String,
  passwordUser:String,
  genderUser:String
});

UserSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('User', UserSchema);

