// a model in sequlize = a table in database
// creates the Jobs Table
// Table for jobs
module.exports = (sequelize, DataTypes) => 
    sequelize.define('Job', {
        job_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        employer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false   
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false   
        },
        salary: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });