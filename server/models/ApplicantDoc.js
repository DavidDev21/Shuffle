// A table to keep track of the applicant's document, along with meta data about which is the main one
// mainly used to track multiple resumes
module.exports = (sequelize, DataTypes) => 
    sequelize.define('ApplicantDoc', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Applicants',
                key: 'email'
            },
            primaryKey: true
        },
        documentID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Documents',
                key: 'documentID'
            },
            primaryKey: true
        },
        main_resume: {
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