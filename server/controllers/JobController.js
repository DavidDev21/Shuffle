const {Job} = require('../models');
const {Applied} = require('../models');
const {Document} = require('../models');
const {sequelize} = require('../models');
const path = require('path');
const fs = require('fs');


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
            WHERE job.\"status\" = \'open\' AND job.\"job_id\" in ((SELECT job_id
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
                requireCoverLetter: req.body.coverLetter,
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
        try
        {
            const filesToDelete = await Document.findAll({
                where: {
                    job_id: req.body.job_id,
                    documentType: 'coverLetter'
                }
            });

            for(let i = 0; i < filesToDelete.length; i++)
            {
                // absolute path to the file
                // let absPath = path.join(__dirname, '..', filesToDelete[i].dataValues.filePath);
                // console.log(path.join(__dirname, '..', filesToDelete[i].dataValues.filePath));
                // Delete the file (To be modified for S3)
                // fs.unlink(absPath, (err) => {
                //     if(err) throw err
                //     console.log('File Deleted');
                // });
                console.log(filesToDelete[i].dataValues.filePath);
                s3.deleteObject({
                    Bucket: 'shuffleproject',
                    Key: filesToDelete[i].dataValues.filePath
                }, function(error, data) {
                    if(error)
                    {
                        console.log(error);
                    }
                    console.log(data);
                });
            }            
            console.log(filesToDelete);

            // Delete all the cover letters that were sent
            await Document.destroy({
                where: {
                    job_id: req.body.job_id,
                    documentType: 'coverLetter'
                }
            })
            // Remove all applicants for the job
            await Applied.destroy({
                where: {
                    job_id: req.body.job_id
                }
            });
            // Remove Job Posting
            await Job.destroy({
                where: {
                    job_id: req.body.job_id
                }
            });

            // Updated Status for any applicants that had removed
            // console.log(response);
            const message = "All related applications and documents to JobID: " + req.body.job_id + " have been deleted"
            res.status(200).send(message);
        }
        catch(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
    },

    // You can only change a few things about a job.
    async updateJob(req, res) {
        try
        {
            // ideally, req is basically a job posting form then we just shove everything in.
            const response = await Job.update({
                // the columns
                description: req.body.description,
                salary: req.body.salary,
                location: req.body.location,
                requireCoverLetter: req.body.requireCoverLetter,
            }, {
                where: {
                    job_id: req.body.job_id,
                    employer: req.body.employer
                }
            });
            res.status(200).send(response);
        }
        catch(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
    },
    async changeJobStatus(req, res)
    {
        console.log("changeJobStatus");
        console.log(req.body);
        try
        {
            await Job.update({
                // columns
                status: req.body.status
                },
                {
                    where: {
                        job_id: req.body.job_id
                    }
                });
            res.status(200).send("JobID: " + req.body.job_id + " is now " + req.body.status);
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
        });
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
                // let serverPath = path.resolve(__dirname, "..");
                // let docPath = req.file.path.substring(serverPath.length);
                
                //path.join(serverPath, "/uploads/documents", req.file.filename);
                //console.log(docPath);
                //console.log(req.file.path.substring(path.join("..",__dirname).length));
                const doc = await Document.create({
                    owner: req.body.email,
                    documentType: req.body.documentType,
                    filePath: req.file.key,
                    job_id: req.body.job_id
                });
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