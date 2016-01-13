module.exports = {
    generateEmailAuthCode: function(email, callback) {
        var code = Math.random().toString(36).slice(-10);
        require('./handleCode.js').setAuthCode(email, code);
        callback(code);
    },
    setAuthCode: function(emailUser, codeUser) {
        var fs = require('fs');
        fs.readFile('database/authCodes.json', 'utf8', function(err, data) {
            var codeList;
            if (err) {
                console.log(err);
                codeList = [];
            } else {
                codeList = JSON.parse(data);
            }
            var userNotExist = true;
            for (var i = 0; i < codeList.length; i++) {
                var userEmailD = codeList[i].email;
                // console.log("userEmailD = %s" + codeList[i]);
                if (userEmailD === emailUser) {
                    codeList[i].code = codeUser;
                    userNotExist = false;
                }
            }
            if (userNotExist) {
                userData = {
                    email: emailUser,
                    code: codeUser
                };
                codeList.push(userData);
            }
            var finalData = JSON.stringify(codeList);
            require('fs').writeFile('database/authCodes.json', finalData, function(err) {
                if (err) console.log(" ***** GOT ERROR ***** ");
                // console.log(" Code save sucessfullt ");
            });
        });
    },
    getAuthCode: function(email, callback) {
        require('fs').readFile('database/authCodes.json', function(err, data) {
            if (err) console.log(" ***** GOT ERROR ***** ");
            var codeList = JSON.parse(data);
            var result;
            for (var i = 0; i < codeList.length; i++) {
                if (codeList[i].email === email) {
                    result = codeList[i].code;
                }
            }
            callback(result);
        });
    }
};
