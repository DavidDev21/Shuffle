const {Job} = require('../models');

module.exports = {
    async getJob(req, res) {
        Job.findOne({order:"random()", limit: 1});
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
};