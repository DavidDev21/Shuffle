const {User} = require('../models')
const {Applicant} = require('../models')
const {Employer} = require('../models')
const {Document} = require('../models')
const path = require('path');
module.exports = {
    async register (req, res) {
        try 
        {
            const user = await User.create({
                userEmail: req.body.email,
                userPassword: req.body.password,
                userType: req.body.userType,
                profileImg: path.join(__dirname, '../', 'assets/no_profile_icon.png')
            })
            if(req.body.userType === 'applicant')
            {
                //res.json({file: req.file});
                // req.file === undefined if file is not binary
                let doc = undefined;
                if(req.file !== undefined)
                {
                    doc = await Document.create({
                        owner: req.body.email,
                        documentType: req.body.documentType,
                        filePath: req.file.path
                    })
                }
                console.log(req.body);
                console.log(req.file);

                // grab the documentID
                console.log(doc.dataValues.documentID);

                // create the Applicant entry
                const applicant = await Applicant.create({
                    email: req.body.email,
                    f_name: req.body.fName,
                    l_name: req.body.lName,
                    major: req.body.major,
                    grad_year: req.body.gradYear,
                    main_resume: doc.dataValues.documentID
                })
            }
            else if(req.body.userType === 'employer')
            {
                const employer = await Employer.create({
                    email: req.body.email,
                    company_name: req.body.companyName,
                    company_description: req.body.companyDescription,
                    year_found: req.body.yearFound
                })
            }

        }
        catch(err)
        {
            console.log(err)
        }
        res.send(
            req.body
        )
    },

    async login (req, res) {
        try
        {
            const response = await User.findAll({
                limit: 1,
                where: {
                    userEmail: req.body.email,
                    userPassword: req.body.password
                }
            })

            // response is an array where each record is a entry in the array. 
            // dataValues is how you access the data on the record
            // console.log(response[0].dataValues)
            // res.send(response)
            if(response.length > 0)
            {
                res.status(200).send('Access Granted')
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