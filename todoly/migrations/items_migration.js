module.exports = {
	up: function(migration, DataTypes, done) {
		migration.createTable('items',
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				createdAt: {
					type: DataTypes.DATE,
					field: 'created_at'
				},
				updatedAt: {
					type: DataTypes.DATE,
					field: 'updated_at'
				},
				user_id: {
					type: DataTypes.INTEGER,
					references: 'users',
					referenceKey: 'id'
				},
				description: DataTypes.STRING,
				completed: DataTypes.BOOLEAN
			}
		)
	},
	down: function(migration, DataTypes, done) {
		migration.dropTable('items')
	}
}