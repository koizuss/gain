module.exports = {
	index: function(req, res) {
		if(req && req.session && req.session.passport && req.session.passport.user) {
			res.json(req.session.passport.user);
			return;
		}
		res.send(401, 'Unauthorized');
	},

	getAccountName: function(req) {
		return req.session.passport.user.emails[0].value.replace(/@.*/, '');
	}
}
