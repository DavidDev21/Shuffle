// a model in sequlize = a table in database
// creates the Employer Table
// Table for Employers
module.exports = (sequelize, DataTypes) => 
    sequelize.define('Employer', {
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
        company_name: {
            type: DataTypes.STRING,
            allowNull: false   
        },
        company_description: {
            type: DataTypes.STRING,
            allowNull: false   
        },
        year_found: {
            type: DataTypes.DATEONLY
        }
    },  {
        timestamps: false
    });