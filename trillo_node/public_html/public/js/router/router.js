App.Router = Backbone.Router.extend({
	initialize: function() {
		console.log('Router initialized');
		App.loginView = new App.Views.Login;
	},
	routes: {
		'':'index',
		'/:user_id/cards':'showCards'
	},
	index: function() {
	},
	showCards: function() {
		console.log('show cards');
	}
});