var RJ = require('../helpers/readWriteJson.js');
module.exports = {

    editProfileValues: function(req, res) {

        var emailUser = req.cookies.email;
        console.log("Cookies:: %s", emailUser);
        RJ.readJsonFile('database/users.json', function(result) {
            for (var i = 0; i < result.length; i++) {
            	if (result[i].email == emailUser){
                       console.log(result[i]);
            		res.send(result[i]);
            	}
            }            
        });
    }
};
