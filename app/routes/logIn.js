module.exports = {

    logInPage: function(req, res) {
    	console.log("Cookies: ", req.cookies);
        res.render('logIn', {
            title: 'login-node'
        });
    }
};
