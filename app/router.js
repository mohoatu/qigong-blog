var express = require('express');
var router = express.Router();
var co = require('co');

var logIn = require('./routes/logIn.js');
var resetPass = require('./routes/resetPassword.js');
var register = require('./routes/register.js');
var dashboard = require('./routes/dashboard.js');
var edit = require('./routes/edit.js');
var mongoose = require('mongoose');
var passwordhash = require('password-hash');
require('./models/user.js');
var wrap = function(fn) {
  var wrap = co.wrap(fn);

  return function (req, res, next) {
    wrap(req, res, next).catch(next);
  }
}
var DBUser = mongoose.model("User");

router.get('/', logIn.logInPage);
router.get('/register', register.register);
router.get('/dashboard', dashboard.getDashboard);
router.get('/edit', edit.editProfile);
router.post('/resetPassword', resetPass.resetPasswordByEmail);
router.post('/registerUser',wrap(function*(res, req,next) {
  var result = res.body;

  var emailUser = result.emailUser;
  var codeUser;
  var registerStatus = true;
  var fNameUser = result.firstName;
  var lNameUser = result.lastName;
  var passwordUser = passwordhash.generate(result.password);
  var genderUser = result.gender;

  var user = new DBUser({
    emailUser: emailUser,
    codeUser: codeUser,
    registerStatus: registerStatus,
    fName:fNameUser,
    lName:lNameUser,
    passwordUser:passwordUser,
    genderUser:genderUser
  });
  user.save();
  req.render('logIn', {
    title: 'login-node'
  });
}));

router.post('/home',wrap (function*(req, res,next) {
  var DBUser = mongoose.model("User");
  console.log(req.body);
  var userId = req.body.username,
    pass = req.body.password,
    rem = req.body.rememder;
  var Cookies = require("cookies");
  var cookies = new Cookies(req, res);
  cookies.set("email", userId, {
    httpOnly: false
  });
  var user = yield DBUser.find({'emailUser':userId}).exec();

  if (user.length > 0)
  {
    var userId = user[0].fName + ' ' + user[0].lName;
    if (passwordhash.verify(pass,user[0].passwordUser))
    {
      res.render('dashboard', {
        title: 'node-login',
        name: userId
      });
    }
    else {
      res.sendStatus(401);
    }

  }
  else res.sendStatus(401);
}));

module.exports = router;
