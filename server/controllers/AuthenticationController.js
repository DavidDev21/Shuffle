const {User} = require('../models')
const {Applicant} = require('../models')
const {Employer} = require('../models')

module.exports = {
    async register (req, res) {
        try 
        {
            const user = await User.create({
                email: req.body.email,
                password: req.body.password,
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
        }
        catch(err)
        {
            console.log(err)
        }
        res.send(
            req.body
        )
    }
}