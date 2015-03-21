App.Views.Login = Backbone.View.extend({
	el: '.main.info',
	initialize: function() {
		console.log('New Login View');
		this.loginForm = new (Backbone.Form.extend({
    	schema: {
        name:       'Text',
        password:   'Password'
    	}
		}));
		// this.loginForm.render();
		this.render();
	},
	render: function() {
		this.$el.html(this.loginForm.render().el);
	},
	events: {
		'keyup':'submitForm'
	},
	submitForm: function(e) {
		if (e.keyCode == 13) {
			var loginView = this;
			var loginForm = this.loginForm;
			$.post( '/users/login', loginForm.getValue() )
			 .done(function(data) {
			 	loginView.$el.attr('hidden', '');
			 	App.router.navigate('/'+data._id+'/cards');
			 	// App.cardsCollection.user_id = data._id;
			 	// App.cardsCollection.fetch()
			 });
		}
	}

});