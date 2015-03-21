App.Collections.Cards = Backbone.Collection.extend({
	initialize: function() {
		console.log('New Cards Collection');
	},
	model: App.Models.Card,
	getPath: function() {
		return [
			'users',
			this.user_id,
			'cards'
		].join('/');
	},

});