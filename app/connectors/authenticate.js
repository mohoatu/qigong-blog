module.exports = {

    authenticateUser: function(userName, password, callback) {
        var fs = require('fs');
        var name;
        console.log("userName = " + userName);
        console.log("password = " + password);

        fs.readFile('database/users.json', 'utf8', function(err, data) {
            if (err) console.log(err);
            var result;
            var userList = JSON.parse(data);
            console.log(userList.length);
            for (var i = 0; i < userList.length; i++) {
                
                if (userList[i].email === userName) {
                	console.log(userList[i]);
                	var result1 = userList[i];
                	result = JSON.stringify(result1);
                }
            };
            callback(result);
        });
    }
};
