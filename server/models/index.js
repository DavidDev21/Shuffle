const fs = require('fs')
const path= require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

// goes through the current directory (models) and import all the sequelize models into the sequelize instance
fs
    .readdirSync(__dirname)
    .filter((file) => 
        file !== 'index.js'
    )
    .forEach((file) => {
        const model= sequelize.import(path.join(__dirname, file))
        db[model.name] = model // db.Applicant = model
    })

db.sequelize = sequelize // sequelize instance
db.Sequelize = Sequelize // sequelize DataTypes 

// Define associations and foreign key constraints
// source.hasOne(target) models
// FOREIGN KEY (target column) REFERENCES SOURCE(column) // in SQL terms
// BelongsTo and hasOne perform same function, but just applies the foriegn keys to different targets
// BelongsTo puts the key on the source
// hasOne puts the key on the target

// Note: seqeuelize will create a foreign key that auto points to the target's PK
// By default, it will reference the target model's PK (if it is only one column)
// "By default the foreign key for a belongsTo relation will be generated from the target model name and the target primary key name."

// Remember: FK has to be unique

// Applicant and Employer referencing User
db.User.hasOne(db.Applicant, {
    foreignKey: {
        name: 'email',
        allowNull: false
    }})

db.User.hasOne(db.Employer, {
    foreignKey: {
        name: 'email',
        allowNull: false
    }})


// Job Table
db.Job.belongsTo(db.Employer, {
    foreignKey: {
        name: 'employer',
        allowNull: false
    }
})

// Applied table 
db.Applied.belongsTo(db.Job, {
    foreignKey: {
        name: 'job_id',
        allowNull: false
    }
})
// db.Applied.belongsTo(db.Applicant, {
//     foreignKey: {
//         name: 'email',
//         allowNull: false
//     }
// })


module.exports = db;