// a model in sequlize = a table in database
// creates the Applicant Table
// Table for applicants
module.exports = (sequelize, DataTypes) => 
    sequelize.define('Applicant', {
        email: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        f_name: {
            type: DataTypes.STRING,
            allowNull: false   
        },
        l_name: {
            type: DataTypes.STRING,
            allowNull: false   
        },
        major: {
            type: DataTypes.STRING,
            allowNull: false
        },
        grad_year: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });