var App = App || {Views: {}, Collections: {}, Models: {}, Router: null };

$(function() {
	App.router = new App.Router;
	Backbone.history.start();
})