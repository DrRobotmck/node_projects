var userRouter = require('./userRoutes'),
	  restrict   = require('./authHelpers').restrict;

// --------- //
// DB Config //
// --------- //

var db        = require('../db/config').db,
    CardModel = require('../db/config').CardModel;

/*
	Cards Routing
   Nested under current user
	 INDEX - GET /users/:user_id/cards
	 CREATE - POST /users/:user_id/cards
	 SHOW - GET /users/:user_id/cards/:card_id
	 UPDATE - PUT /users/:user_id/cards/:card_id
	 DELETE - DELETE /users/:user_id/cards/:card_id
*/

// ----- //
// INDEX //
// ----- //

userRouter.get('/:user_id/cards', restrict, function(req, res, next) {
	var userId = req.params.user_id;

	CardModel.find( { user_id: userId } , function(error, cards) {
		if (!error) {
			return res.send(cards);
		} else {
			console.log(error);
			return res.send(422);
		}
	});
});

// ------ //
// CREATE //
// ------ //

userRouter.post('/:user_id/cards', restrict, function(req, res, next) {
	var userId   = req.params.user_id,
			cardData = req.body,
			newCard;

	newCard = new CardModel({
		content:     cardData.content,
		dateCreated: new Date().getTime(),
		completed:   false,
		user_id:     userId
	});

	return newCard.save(function(error, user) {
		if (!error) {
			return res.send(newCard);
		} else {
			console.log(error);
			return res.status(422).send();
		}
	});
});

// ---- //
// SHOW //
// ---- //

userRouter.get('/:user_id/cards/:card_id', restrict, function(req, res, next) {
	var cardId = req.params.card_id,
			card;

	CardModel.findById( cardId, function(error, card) {
		if(!error) {
			return res.send(card);
		} else {
			console.log(error);
			return res.status(422).send();
		}
	});
});

// ------ //
// UPDATE //
// ------ //

userRouter.put('/:user_id/cards/:card_id', restrict, function(req, res, next) {
	var cardId   = req.params.card_id,
			cardData = req.body,
			card;

	CardModel.findOneAndUpdate(
		{ _id: cardId },
		{ $set: {
			content: cardData.content,
			completed: cardData.completed
			}
		},
		function(error, card) {
			if (!error) {
				res.send(card);
			} else {
				console.log(error);
				res.status(422).send();
			}
		});
});

// ------ //
// DELETE //
// ------ //

userRouter.delete('/:user_id/cards/:card_id', restrict, function(req, res, next) {
	var userId = req.params.user_id,
			cardId = req.params.card_id,
			card;

	CardModel.findOneAndRemove( { _id: cardId }, function(error, card) {
		if (!error) {
			res.send(card);
		} else {
			console.log(error);
			res.status(422).send();
		}
	});
});
