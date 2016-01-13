module.exports = {

    getHomePage: function(req, res) {
        var userId = req.body.username,
            pass = req.body.password,
            rem = req.body.rememder,
            authenticate = require('../connectors/authenticate.js');

        var Cookies = require("cookies");
        var cookies = new Cookies(req, res);
        cookies.set("email", userId, {
            httpOnly: false
        });

        authenticate.authenticateUser(userId, pass, function(data) {
            var parseJson = require('../helpers/parseJson.js');
            var firstName = parseJson.getValueFromJson('firstname', data, function() {}) || '';
            var lastName = parseJson.getValueFromJson('lastname', data, function() {}) || '';

            var userId = firstName + ' ' + lastName;
            res.render('dashboard', {
                title: 'node-login',
                name: userId
            });
        });
    }
};
