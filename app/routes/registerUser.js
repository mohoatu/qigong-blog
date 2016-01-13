var fs = require('fs');

module.exports = {

    registerNewUser: function(res, req) {
        console.log(res.body);
        var result = res.body;

        var addId = require('./registerUser.js');

        var emailUser = result.email;
        var codeUser;
        var registerStatus = true;
        var fNameUser = result.firstName;
        var lNameUser = result.lastName;
        var passwordUser = result.password;
        var genderUser = result.gender;


        addId.adduserId(emailUser, registerStatus, fNameUser, lNameUser, passwordUser, genderUser, function(err) {
            if (err) console.log(err);
            req.send("Success");
        });

        // var name = userId.replace('@', '').replace('.', '');
        // var filePath = 'database/users/' + name + '.json';
        // var data = JSON.stringify(result);

        // fs.readFile(filePath, function(err) {
        //     if (err) {
        //         fs.writeFile(filePath, data, function(err) {
        //             if (err) console.log(err);

        //             console.log(" Done !!");

        //             addId.adduserId(userId, function(err) {
        //                 if (err) console.log(err);
        //             });
        //         });
        //     } else {
        //         console.log('User already exist');
        //     }
        // });

        // req.send("Success");
        // req.send("Please wait \n we are in process of registering your user ");
        // req.render('logIn', {
        //     title: 'node-login'
        // });
    },
    adduserId: function(emailUser, registerStatus, fnameUser, lnameUser, passwordUser, genderUser, callback) {
        fs.readFile('database/users.json', 'utf8', function(err, data) {
            if (err) console.log(err);

            // if (typeof data === 'undefined') var userList = []; //if file does not exist
            // else if (data.length === 0) var userList = []; //if file is empty

            var userList = JSON.parse(data); //if file has data
            var userNotExist = true;
            for (var i = 0; i < userList.length; i++) {
                var emailfromData = userList[i].email;
                if (emailfromData === emailUser) {
                    userNotExist = false;
                    userList[i].register = registerStatus;
                    userList[i].firstname = fnameUser;
                    userList[i].lastname = lnameUser;
                    userList[i].password = passwordUser;
                    userList[i].gender = genderUser;
                }
            }

            if (userNotExist) {
                userData = {
                    email: emailUser,
                    register: registerStatus,
                    firstname: fnameUser,
                    lastname: lnameUser,
                    password: passwordUser,
                    gender: genderUser
                };
                userList.push(userData);
            }
            var finalData = JSON.stringify(userList);

            fs.writeFile('database/users.json', finalData, function(err) {
                if (err) console.log(err);
                callback("Success");
            });
        });
    }
};
