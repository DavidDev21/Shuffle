// a model in sequlize = a table in database
// creates the Employer Table
// Table for Employers
module.exports = (sequelize, DataTypes) => 
    sequelize.define('Employer', {
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
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