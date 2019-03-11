// Representing all documents on the site
module.exports = (sequelize, DataTypes) => 
    sequelize.define('Document', {
        documentID:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        owner:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        documentType:
        {
            type: DataTypes.STRING,
            defaultValue: 'N/A'
        }
        ,
        filePath:
        {
            type: DataTypes.STRING,
            defaultValue: 'N/A'
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