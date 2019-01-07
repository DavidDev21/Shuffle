// a model in sequlize = a table in database
// creates the Jobs Table
// Table for jobs that applicants applied to
module.exports = (sequelize, DataTypes) => 
    sequelize.define('Applied', {
        job_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        applicant: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        appliedOn: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });