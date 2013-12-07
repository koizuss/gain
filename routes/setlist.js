"use strict";

var dateformat = require("dateformat"),
	account = require('../routes/account'),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	SetListSchema = new Schema({
		key: String,
		name: String,
		auth: String
	});

mongoose.model('SetList', SetListSchema);
mongoose.connect('mongodb://localhost/gein');

var SetList = mongoose.model('SetList');

module.exports = {
	index: function(req, res) {
		SetList.find({}, function(err, setlists) {
			if(err) {
				console.log('error: setlist find', err);
				res.send('500', err);
				return;
			}
			res.json(setlists);
		});
	},

	create: function(req, res) {
		var setlist = new SetList({
			auth: account.getAccountName(req)
		});

		setlist.save(function(err) {
			if(err) {
				console.log('error: create setlist', err);
				res.send(500, err);
				return;
			}
			res.json(setlist);
		});
	}
}
