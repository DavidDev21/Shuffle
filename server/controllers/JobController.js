const {Job} = require('../models');
const {Applied} = require('../models');
const {Document} = require('../models');
const {sequelize} = require('../models');
const path = require('path');

/* POSTGRES VERSION (Filters out jobs that the applicant already applied to)
SELECT  job."job_id", job."title", job."description", company_name, "Users"."profileImg", 
job."salary", job."location", job."requireCoverLetter", DATE(job."createdAt") as postedAt
FROM ("Employers" NATURAL JOIN "Jobs" as job) JOIN "Users" ON job.employer = "Users".email AND 
"Employers".email = job.employer
WHERE job."job_id" in ((SELECT job_id
	  FROM "Jobs")
	EXCEPT (SELECT job_id 
	  FROM "Applied"
	  WHERE applicant = 'davidzheng54@gmail.com'))
ORDER BY random()
LIMIT 1;
*/

module.exports = {
    async getJob(req, res) {
        const email = req.body.email;
        const getJobQuery = `SELECT  job.\"job_id\", job.\"title\", job.\"description\", company_name, \"Users\".\"profileImg\", 
            job.\"salary\", job.\"location\", job.\"requireCoverLetter\", DATE(job.\"createdAt\") as postedAt
            FROM (\"Employers\" NATURAL JOIN \"Jobs\" as job) JOIN \"Users\" ON job.employer = \"Users\".email AND 
            "Employers".email = job.employer
            WHERE job.\"job_id\" in ((SELECT job_id
                FROM \"Jobs\")
                EXCEPT (SELECT job_id 
                FROM \"Applied\"
                WHERE applicant = \'${email}\'))
            ORDER BY random()
            LIMIT 1;`;
        try
        {
            // To be changed to utilize sequelize function calls (current issues with doing joins via sequelize)
            const response = await sequelize.query(getJobQuery);
            // console.log(response) // responses is an array. response[0] == array of entries
            if(response[0].length === 0)
            {
                res.status(404).send("No More Jobs Avaliable");
            }
            else
            {
                res.status(200).send(response[0][0]);
            }
        }
        catch(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
    },
    async getJobStatus(req, res) {
        /*
            Job ID
            Job Title
            Employer
            Contact (Email)
            Location
            Status
        */
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
        let application = {
            job_id: req.body.job_id,
            applicant: req.body.email
        }

        // Shouldn't be the case where we showed a job that the user already applied to
        const hasApplied = await Applied.findOne({
            where: {
                job_id: req.body.job_id,
                applicant: req.body.email
            }
        })
        console.log("err")
        if(hasApplied !== null)
        {
            console.log('I am here')
            res.status(400).send({error: "User Has already applied to " + req.body.job_id});
            return;
        }
        
        try{
            // req should be pass in the applicant's info like email
            // Note: even if the email gets changed, it should be unique inside the database so we can use it as a key
            if(req.file !== undefined)
            {
                // console.log(path.resolve(__dirname,".."));

                // strips apart the server path from the full path of where the file is stored
                // the docPath should match what the GET route for the files are
                let serverPath = path.resolve(__dirname, "..");
                let docPath = req.file.path.substring(serverPath.length);
                
                //path.join(serverPath, "/uploads/documents", req.file.filename);
                //console.log(docPath);
                // console.log(req.file.path.substring(path.join("..",__dirname).length));
                const doc = await Document.create({
                    owner: req.body.email,
                    documentType: req.body.documentType,
                    filePath: docPath
                });

                application.coverLetterID = doc.dataValues.documentID;
            }
            
            const response = await Applied.create(application);
            res.status(200).send(response);
        }
        catch(err)
        {
            console.log(err)
            res.status(400).send(err);
        }
    }
};