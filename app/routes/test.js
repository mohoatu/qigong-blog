var addUser = require('./registerUser.js');


var emailUser = "km@gmail.com";
var codeUser = "123453445";
var registerStatus = true;
var name = "Man";

addUser.adduserId(emailUser, codeUser, registerStatus, name, function(result) {
    console.log('Result = ' + result);
});
