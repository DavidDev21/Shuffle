module.exports = (sequelize, DataTypes) => 
    sequelize.define('verificationtoken', {
            userID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                foreignKey: true,
                references:
                {
                    model: 'Users',
                    key: 'id'
                }
            },
            token: {
                type: DataTypes.STRING,
                unique: true
            }
        });