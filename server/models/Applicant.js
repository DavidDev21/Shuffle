// a model in sequlize = a table in database
// creates the Applicant Table
// Table for applicants

// main_resume = references Documents Table (documentID)
module.exports = (sequelize, DataTypes) => 
    sequelize.define('Applicant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            foreignKey: true,
            references:
            {
                model: 'Users',
                key: 'id'
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            foreignKey: true,
            references: {
                model: 'Users',
                key: 'email'
            }
        },
        f_name: {
            type: DataTypes.STRING,
            allowNull: false   
        },
        l_name: {
            type: DataTypes.STRING,
            allowNull: false   
        },
        major: {
            type: DataTypes.STRING,
            allowNull: false
        },
        grad_year: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });