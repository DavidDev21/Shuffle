// a model in sequlize = a table in database
// creates the User Table
// Table for general user type
// Applicant, Employer tables references User.email
// The profileImg can be employer's logo,or applicant's picture
module.exports = (sequelize, DataTypes) => 
    sequelize.define('User', {
        userEmail: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profileImg: {
            type: DataTypes.STRING,
            defaultValue: 'N/A'
        },
        userType: {
            type: DataTypes.STRING,
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