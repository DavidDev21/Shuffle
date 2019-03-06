const {User} = require('../models')
const {Applicant} = require('../models')
const {Employer} = require('../models')

module.exports = {
    async register (req, res) {
        try 
        {
            const user = await User.create({
                userEmail: req.body.email,
                userPassword: req.body.password,
                userType: req.body.userType
            })
            if(req.body.userType === 'applicant')
            {
                const applicant = await Applicant.create({
                    email: req.body.email,
                    f_name: req.body.fName,
                    l_name: req.body.lName,
                    major: req.body.major,
                    grad_year: req.body.gradYear
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
            //res.json({file: req.file});
            // req.file === undefined if file is not binary
            if(req.file !== undefined)
            {
                
            }
            console.log(req.body);
            console.log(req.file);
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