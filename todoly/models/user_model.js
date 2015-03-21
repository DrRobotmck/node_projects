module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("users", {
		name: {
			type: DataTypes.STRING,
			field: 'name'
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

	return User;
}