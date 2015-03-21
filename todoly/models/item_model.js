module.exports = function(sequelize, DataTypes) {
	var Item = sequelize.define("items", {
		description: {
			type: DataTypes.STRING,
			field: 'description'
		},
		completed: {
			type: DataTypes.BOOLEAN,
			field: 'completed'
		},
		user_id: {
			type: DataTypes.INTEGER,
			field: 'user_id',
			foreignKey: true
		},
		createdAt: {
			type: DataTypes.DATE,
			field: 'created_at'
		},
		updatedAt: {
			type: DataTypes.DATE,
			field: 'updated_at'
		}
	});

	return Item;
}