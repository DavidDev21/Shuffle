const {Job} = require('../models');
const {Applied} = require('../models');
const {Document} = require('../models');

module.exports = {
    async getJob(req, res) {
        try
        {
            const response = await Job.findOne({order:"random()", limit: 1});
            res.status(200).send(response);
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
            res.status(200).send(response);
        }
        catch(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
    },
    async removeJob(req, res) {
        const jobID = req.params.jobID;
        try
        {
            const response = await Job.destroy({
                where: {
                    job_id: jobID
                }
            })
            console.log(response);
        }
        catch(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
    },
    async updateJob(req, res) {
        const jobID = req.params.jobID;
        try
        {
            // ideally, req is basically a job posting form then we just shove everything in.
            const response = await Job.update({
                // the columns
            }, {
                where: {
                    job_id: jobID
                }
            });
        }
        catch(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
    },
    async applyJob(req, res) {
        const jobID = req.params.jobID;
        let application = {
            job_id: jobID,
            applicant: req.body.email
        }
        // req should be pass in the applicant's info like email
        // Note: even if the email gets changed, it should be unique inside the database so we can use it as a key
        if(req.coverLetter !== undefined)
        {
            application.coverLetter = req.coverLetter;
        }
        
        const response = await Applied.create(application)
    }
};