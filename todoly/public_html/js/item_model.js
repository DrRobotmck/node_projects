var App = {
	Models: {},
	Collections: {},
	Views: {}
};

App.Models.Item = Backbone.Model.extend({
	initialize: function() {
		console.log('New Model Created');
	},
	defaults: { completed: false },
	toggle: function() {
		this.get('completed') ? this.save('completed', false) : this.save('completed', true);
	}
});