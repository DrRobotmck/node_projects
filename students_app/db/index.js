var db               = {},
		Sequelize        = require('sequelize'),
    sequelize        = new Sequelize('student_tracker_app',
    																 'macadocious',
    																 process.env.GMAIL_PASSWORD,
    																 {
    																 	 dialect: 'postgres',
    																 	 port: 5432
    																 });

sequelize.authenticate()
				 .complete(function(err) {
				 	if (!!err) {
				 		console.log(err)
					} else {
						console.log('Connected');
					}
				 });

var Student = sequelize.define("students", {

		name: {
			type: Sequelize.STRING,
			field: 'name'
		},
		github_handle: {
			type: Sequelize.STRING,
			field: 'github_handle'
		},
		is_instructor: {
			type: Sequelize.BOOLEAN,
			field: 'is_instructor'
		}
	},
	{
		timestamps: false
	});

var Assignment = sequelize.define("assignments", {

	comfortability: {
		type: Sequelize.INTEGER,
		field: 'comfortability'
	},
	completeness: {
		type: Sequelize.INTEGER,
		field: 'completeness'
	},
	createdAt: {
		type: Sequelize.DATE,
		field: 'created_at'
	},
	updatedAt: {
		type: Sequelize.DATE,
		field: 'updated_at'
	}
});

Student.hasMany(Assignment, {
	foreignKey: {
		name: 'student_id',
		allowNull: false
	}
})
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Student = Student;
db.Assignment = Assignment;

module.exports = db;