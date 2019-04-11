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
        job_id: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            foreignKey: true,
            references: {
                model: 'Jobs',
                key: 'job_id'
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
    });