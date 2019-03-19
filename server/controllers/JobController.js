const {Job} = require('../models');

module.exports = {
    async getJob(req, res) {
        try
        {
            const response = await Job.findOne({order:"random()", limit: 1});
        }
        catch(err)
        {
            console.log(err);
        }
    },
    async postJob(req, res) {
        try 
        {
            console.log(req.body);
            const job = {
                employer: req.body.employer,
                title: req.body.title,
                description: req.body.description,
                salary: req.body.salary,
                location: req.body.location,
                requireCoverLetter: req.body.requireCoverLetter,
            };
            const response = await Job.create(job);
            console.log(response);
            res.status(200).send({message: "Job Created"});
        }
        catch(err)
        {
            console.log(err);
        }
    },
    async removeJob(req, res) {
        let jobID = req.params.jobID;
        try
        {
            const response = await Job.destroy({
                where: {
                    job_id: jobID
                }
            })
        }
        catch(err)
        {
            console.log(err);
        }
    }
};