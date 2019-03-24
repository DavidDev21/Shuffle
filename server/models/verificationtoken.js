module.exports = (sequelize, DataTypes)=> {
    const verificationtoken = sequelize.define('verificationtoken', {
            userId: DataTypes.STRING,
            token: DataTypes.STRING
        },);
        
    verificationtoken.associate=(models)=>{
            verificationtoken.belongsTo(models.User, {
                as: "user",
                foreignKey: "userId",
                foreignKeyConstraint: true,
            });
        }
    return verificationtoken;
};