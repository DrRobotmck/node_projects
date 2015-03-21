// Sample Migration
//
// module.exports = {
// 	up: function(migration, DataTypes, done) {
// 		migration.createTable('users',
// 			{
// 				id: {
// 					type: DataTypes.INTEGER,
// 					primaryKey: true,
// 					autoIncrement: true
// 				},
// 				createdAt: {
// 					type: DataTypes.DATE,
// 					field: 'created_at'
// 				},
// 				updatedAt: {
// 					type: DataTypes.DATE,
// 					field: 'updated_at'
// 				},
// 				name: DataTypes.STRING
// 			}
// 		);
// 	},
// 	down: function(migration, DataTypes, done) {
// 		migration.dropTable('users');
// 	}
// };