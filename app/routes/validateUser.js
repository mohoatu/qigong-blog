module.exports = {

    findUser: function(req, res, callback) {
        var userId = req.query.key;
        var result = false;
        console.log(" On server  -- user to validate = " + userId);

        //Reading users.json from database
        // currently data is all json
        require('fs').readFile('database/users.json', 'utf8', function(err, data) {
            if (err) console.log(err);
            console.log("errrr =  ")
            console.log(err);
            var userList = JSON.parse(data);

            for (var user in userList) {
                console.log(userList[user].email);
                if (userId === userList[user].email) result = true;
            }
            res.send(result);
        });


    }
};
