// a model in sequlize = a table in database
// creates the User Table
// Table for general user type
// Applicant, Employer tables references User.email
// The profileImg can be employer's logo,or applicant's picture
module.exports = (sequelize, DataTypes) => {
    const User =sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
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
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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

    User.associate = (models)=>{
        User.hasOne(models.verificationtoken,{
            as: 'verificationtoken',
            foreignKey: 'userId',
            foreignKeyConstraint: true,
        });
    };
    return User;
};