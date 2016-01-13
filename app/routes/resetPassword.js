var forgetPass = require('../connectors/forgetPass.js');

module.exports = {

    resetPasswordByEmail: function(req, res) {
        forgetPass.resetPassword(req, function(result) {
            res.send(result);
        });
    }
};
