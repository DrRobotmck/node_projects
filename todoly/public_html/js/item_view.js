App.Views.Item = Backbone.View.extend({
	className: 'todo-item',
	tagName: 'div',
	initialize: function() {
		console.log('New Item View created');
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.template = Handlebars.compile($('#item-template').html());
		this.render();
	},
	render: function() {
		var modelData = this.model.toJSON();
		var compiledTemplate = this.template(modelData);
		this.$el.html(compiledTemplate)
		this.model.get('completed') ? this.$el.addClass('done') : this.$el.removeClass('done');
	},
	events: {
		'click .delete': 'deleteItem',
		'click .checkbox': 'toggleDone'
	},
	deleteItem: function() {
		this.model.destroy();
	},
	toggleDone: function() {
		this.model.toggle();
	}
});