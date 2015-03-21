$(function() {
	App.collection = new App.Collections.Items();
	App.listView = new App.Views.Items({ collection: App.collection });
	App.collection.fetch({ reset: true });
});