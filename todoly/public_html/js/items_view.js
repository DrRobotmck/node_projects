App.Views.Items = Backbone.View.extend({
	el: '#items-collection-view',
	initialize: function() {
		console.log('New Collection Items View created');
		this.listenTo(this.collection, 'reset', this.renderAllItems);
		this.listenTo(this.collection, 'add', this.renderItem);
	},
	renderAllItems: function() {
		this.collection.reversed().each(this.renderItem, this);
	},
	renderItem: function(model) {
		var newItemView = new App.Views.Item({ model: model });
		this.$el.append( newItemView.$el );
	},
	events: {
		'click #submit': 'newTodo'
	},
	newTodo: function() {
		var data = { description: $('[name="description"]').val() };
		this.collection.create(data);
		$('input').val('');
	}

});