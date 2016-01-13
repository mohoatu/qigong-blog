module.exports = {

    editProfile: function(req, res) {


    	console.log("Cookies: ", req.cookies.email);

        res.render('edit', {
            title: 'login-node',
            fname : "maninder"
        });
    }
};