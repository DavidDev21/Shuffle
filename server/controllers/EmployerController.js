const {Job} = require('../models');
const {Applied} = require('../models');
const {sequelize} = require('../models');
const path = require('path');

module.exports = {
    async getApplicant(req, res) 
    {

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

            console.log(response);
            let numApplicants = []
            for(let i = 0; i < response.length; i++)
            {
                const aggregatedCount = await Applied.findOne({
                    where: {
                        job_id: response[i].dataValues.job_id
                    },
                    attributes: [[sequelize.fn('COUNT', sequelize.col('applicant')), 'numApplicants']]
                });

                console.log(aggregatedCount);
                numApplicants.push({
                    job_id: response[i].dataValues.job_id,
                    numApplicants: aggregatedCount.dataValues.numApplicants
                });
            }
            console.log(numApplicants);
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