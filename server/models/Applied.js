// a model in sequlize = a table in database
// creates the Jobs Table
// Table for jobs that applicants applied to
module.exports = (sequelize, DataTypes) => 
    sequelize.define('Applied', {
        job_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            foriegnKey: true,
            references: {
                model: 'Jobs',
                key: 'job_id'
            }
        },
        applicant: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            foriegnKey: true,
            references: {
                model: 'Applicants',
                key: 'email'
            }
        },
        appliedOn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coverLetter: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('NOW()')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('NOW()')
        }
    }, {
        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'Applied',
        timestamps: true
    });