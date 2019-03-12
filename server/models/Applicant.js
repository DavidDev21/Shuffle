// a model in sequlize = a table in database
// creates the Applicant Table
// Table for applicants

// main_resume = references Documents Table (documentID)
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
            type: DataTypes.STRING
        },
        grad_year: {
            type: DataTypes.DATEONLY
        },
        main_resume:{
            type: DataTypes.INTEGER,
            defaultValue: -1,
            allowNull: false
        }
    }, {
        timestamps: false
    });