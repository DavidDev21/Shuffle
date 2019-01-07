// a model in sequlize = a table in database
// creates the User Table
// Table for general user type
// Applicant, Employer tables references User.email
module.exports = (sequelize, DataTypes) => 
    sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });