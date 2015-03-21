$('button').click(function(){
	var id = $(this).attr('data-id');

	$.ajax({
		url: '/students/' + id,
		type: 'post',
		method: 'delete'
	}).done(function(){
		window.location.replace('/students')
	})
})