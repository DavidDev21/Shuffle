const {User} = require('../models');
const {Applicant} = require('../models');
const {Employer} = require('../models');
const {Document} = require('../models');
const {ApplicantDoc} = require('../models');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const {verificationtoken} = require('../models');
const crypto =  require('crypto');
const assert = require('assert');
const { check, validationResult } = require('express-validator/check');
module.exports = {
    async register (req, res) {
        try 
        {

            sgMail.setApiKey('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');

            const user = await User.create({
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType,
                profileImg: path.join('/assets/no_profile_icon.png')
            });
            //req.assert(user.dataValues.email,'email is not valid').isEmail();
            const token = await verificationtoken.create({ 
                userID: user.id, 
                token: crypto.randomBytes(16).toString('hex') 
            });

            const msg = {
                to: user.email,					//receiver's email
                from: 'no-reply@example.com',			//sender's email
                subject: 'verify your email',				//Subject
                text: 'Click on this link to verify your email ${hostUrl}/verification',		//content
                html: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/'+token.token+'\n',			//HTML content
              };

            sgMail.send(msg);
            
            if(req.body.userType === 'applicant')
            {
                let entry = {
                    id: user.dataValues.id,
                    email: req.body.email,
                    f_name: req.body.fName,
                    l_name: req.body.lName,
                    major: req.body.major,
                    grad_year: req.body.gradYear,
                };

                // create the Applicant entry
                const applicant = await Applicant.create(entry);
                
                //res.json({file: req.file});
                // req.file === undefined if file is not binary

                if(req.file !== undefined)
                {
                    let docID = undefined;
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

                    docID = doc.dataValues.documentID;

                    if(docID !== undefined)
                    {
                        const appDoc = await ApplicantDoc.create({
                            email: entry.email,
                            documentID: docID,
                            main_resume: true
                        })
                    }
                }
                console.log(req.body);
                // console.log(req.file);

                // grab the documentID
                // console.log(doc.dataValues.documentID);


                
            }
            else if(req.body.userType === 'employer')
            {
                const employer = await Employer.create({
                    id: user.dataValues.id,
                    email: req.body.email,
                    company_name: req.body.companyName,
                    company_description: req.body.companyDescription,
                    year_found: req.body.yearFound
                });
            }
        }
        catch(err)
        {
            console.log(err);
        }
        res.send(
            req.body
        )
    },

    async login (req, res) {
        try
        {
            const response = await User.findOne({
                where: {
                    email: req.body.email,
                    password: req.body.password
                }
            });

            console.log(response);
            // response is an array where each record is a entry in the array. 
            // dataValues is how you access the data on the record
            //console.log(response[0].dataValues)
            // res.send(response)

            if(response !== null && response.dataValues.isVerified ===true)
            {
                let userData = undefined;
                if(response.dataValues.userType === "applicant")
                {
                    userData = await Applicant.findOne({
                        where: {
                            email: response.dataValues.email
                        }
                    });
                }
                else if(response.dataValues.userType === "employer")
                {
                    userData = await Employer.findOne({
                        where: {
                            email: response.dataValues.email
                        }
                    });
                }
                console.log(userData.dataValues);
                userData.dataValues.userType = response.dataValues.userType;
                res.status(200).send(userData.dataValues);
            }            
            else
            {
                res.status(401).send('Access Denied')
            }

        }
        catch(err)
        {
            console.log(err)
            res.status(400).send('Bad Request')
        }
    }
}