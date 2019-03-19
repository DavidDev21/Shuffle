// a model in sequlize = a table in database
// creates the Jobs Table
// Table for jobs

// Note: Employer Logo can be found by querying the User table
module.exports = (sequelize, DataTypes) => 
    sequelize.define('Job', {
        job_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        employer: {
            type: DataTypes.STRING,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Employers',
                key: 'email'
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false   
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false   
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        requireCoverLetter: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
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
        timestamps: true
    });