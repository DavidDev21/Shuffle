module.exports = (sequelize, DataTypes) => 
    sequelize.define('verificationtoken', {
            userId: {
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