module.exports = {

    verifyUserCode: function(req, res) {
        var userCode = req.body.userCode;
        var userEmail = req.body.email;
        var result = false;
        require('../helpers/handleCode.js').getAuthCode(userEmail, function(data) {
            console.log("User Code User = " + userCode);
            console.log("User Code Data = " + data);
            if (userCode == data) result = true;
            res.send(result);
        });
    }
};