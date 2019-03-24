<<<<<<< HEAD
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
=======
// Representing all documents on the site
// Mainly Resumes and Cover Letters
// Problem: what if user has multiple resumes?
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
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Users',
                key: 'email'
            }
        },
        documentType:
        {
            type: DataTypes.STRING,
            defaultValue: 'N/A'
        },
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
>>>>>>> 3a8d5fd19024bc6772fc175a2b5a11d99a8c88d3
    });