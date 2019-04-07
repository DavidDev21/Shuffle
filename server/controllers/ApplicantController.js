const {Job} = require('../models');
const {Applied} = require('../models');
const {sequelize} = require('../models');
const path = require('path');


/*
SELECT "Jobs"."job_id", "Jobs"."title","Jobs"."location", "Jobs"."salary",
		"Employers"."company_name", "Employers"."email", "Applied"."status"
FROM ("Jobs" JOIN "Applied" ON "Jobs"."job_id" = "Applied"."job_id") JOIN 
		"Employers" ON "Employers"."email" = "Jobs"."employer"
WHERE "Applied"."applicant" = 'davidzheng54@gmail.com'
ORDER BY "Jobs"."job_id"
*/
module.exports = {

    async getApplicationStatus(req, res) {
        console.log(req.body)
        const userEmail = req.body.email;
        const getAppQuery = `SELECT "Jobs"."job_id", "Jobs"."title","Jobs"."location", "Jobs"."salary",
		"Employers"."company_name", "Employers"."email", "Applied"."status"
FROM ("Jobs" JOIN "Applied" ON "Jobs"."job_id" = "Applied"."job_id") JOIN 
        "Employers" ON "Employers"."email" = "Jobs"."employer"
        WHERE "Applied"."applicant" = '${userEmail}'
        ORDER BY "Jobs"."job_id"`;

        /*
            Job ID
            Job Title
            Employer
            Contact (Email)
            Location
            Status
        */
        try
        {
            const response = await sequelize.query(getAppQuery);
            console.log(response)
            res.status(200).send(response[0]);
        }
        catch(err)
        {
            res.status(400).send(err);
        }
    },
};