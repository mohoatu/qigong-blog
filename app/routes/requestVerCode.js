var SM =  require('../helpers/sendMail');
module.exports = {

    sendEmailCode: function(req, res) {
        var toEmail = req.body.email;

        require('../helpers/handleCode').generateEmailAuthCode(toEmail, function(data) {

            // console.log(" To Email = " + toEmail);
            // console.log(" Code = " + data);

            require('../helpers/sendMail').sendCodeEmail(toEmail, data, function(result) {

                // console.log("Response from add email == " + result);
                res.send(result);
            });
        });

        
    }
};
