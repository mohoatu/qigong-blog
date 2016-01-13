module.exports = {

    getDashboard: function(req, res) {
    	console.log(req);
        res.render('dashboard', {
            title: 'login-node'
        });
    }
};