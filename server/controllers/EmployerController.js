const {Job} = require('../models');
const {Applied} = require('../models');
const {sequelize} = require('../models');
const path = require('path');

module.exports = {

    // We can assume we won't see the same applicant more than once
    // employer changes application status when they review the applcation
    async getApplicant(req, res) 
    {
        try
        {
            const job_id = req.body.job_id;
            // Query to get general info about the applicant
            const getApplicantQuery = `SELECT "Applied"."job_id", "Applied"."applicant", "Applied"."status", "Applied"."coverLetterID",
                                        "Applicants"."f_name", "Applicants"."l_name", "Applicants"."major", "Applicants"."grad_year",
                                        "Applicants"."bio",
                                        DATE("Applied"."createdAt") as "AppliedOn"
                                FROM ("Applied" JOIN "Applicants" ON "Applied"."applicant" = "Applicants"."email")
                                WHERE "Applied"."job_id" = ${job_id} AND status='under_review'
                                ORDER BY random()
                                LIMIT 1`;

            const applicantInfo = await sequelize.query(getApplicantQuery);
            // // might need to do a raw SQL query to get all info regarding the applicant
            // const response = await Applied.findOne({
            //     where: {
            //         job_id: req.body.job_id,
            //         status: 'under_review'
            //     },
            //     order: sequelize.random()
            // });

            // applicantInfo[0] gives the array of results, but we know we only get one entry back
            // due to "LIMIT 1"
            res.status(200).send(applicantInfo[0][0]);
        }
        catch(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
    },
    async getJobPostings(req, res)
    {
        try
        {
            const response = await Job.findAll({
                where: {
                    employer: req.body.email
                },
                order: [
                    ['job_id', 'ASC']
                ],
                attributes: { include: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'createdAt'],
                                        [sequelize.fn('DATE', sequelize.col('updatedAt')), 'updatedAt']]}
            });

            // console.log(response);
            // let numApplicants = []

            // calculates the num of applicants for a job
            for(let i = 0; i < response.length; i++)
            {
                const aggregatedCount = await Applied.findOne({
                    where: {
                        job_id: response[i].dataValues.job_id
                    },
                    attributes: [[sequelize.fn('COUNT', sequelize.col('applicant')), 'numApplicants']]
                });
                
                // add the numApplicants as part of the response to each job object
                response[i].dataValues.numApplicants = aggregatedCount.dataValues.numApplicants;

                // numApplicants.push({
                //     job_id: response[i].dataValues.job_id,
                //     numApplicants: aggregatedCount.dataValues.numApplicants
                // });
            }
            // console.log(numApplicants);
            // getting the number of applicants for all job postings
            res.status(200).send(response);
        }
        catch(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
    },
};