
module.exports = {

    resetPasswordByEmail: function(req, res) {
        forgetPass.resetPassword(req, function(result) {
            res.send(result);
        });
    }
};
