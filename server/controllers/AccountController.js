const {User} = require('../models');
const {Applicant} = require('../models');
const {Employer} = require('../models');
const {sequelize} = require('../models');
const {verificationtoken} = require('../models');
const crypto =  require('crypto');
const sgMail = require('@sendgrid/mail');
const path = require('path');
const fs = require('fs');
const {Document} = require('../models');
module.exports = {
    async changeEmail(req, res)
    {
        const userID = req.params.userID;

        try
        {
            const response = await User.update({
                email: req.body.email
            }, {
                where:{
                    id: userID
                }});
        }
        catch(err)
        {
            // Possibly violate a unique constraint for email
            console.log(err);
            res.status(401).send(err);
        }
    },
    async sendResetEmail(req, res) 
    {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if(user!==undefined){
            if(user.dataValues.isVerified==true){
                sgMail.setApiKey('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');
                console.log(req.body.email);
                console.log(req.headers.host);
                const msg = {
                    to: req.body.email,					//receiver's email
                    from: 'no-reply@example.com',			//sender's email
                    subject: 'Please update your password using this link',				//Subject
                    text: 'Click on this link to change your password',		//content
                    html: 'Hello,\n\n' + 'Please change your password by clicking the link: \nhttp:\/\/' + req.headers.host + '\/change-password\/'+'.\n',			//HTML content
                  };
                sgMail.send(msg);
                res.status(200).send('Reset Link sent');
            }
            else{
                res.status(404).send('Email not veiried yet.')
            }
        }
        else{
            res.status(404).send('Email not found');
        }
    },
    //get new password from web form
    async redirectToNewPass(req,res){
        //let userEmail = req.params.email;
        res.status(200).send('http:\/\/localhost:8080/resetPassword/'+req.params.email);
        //res.status(200).redirect('http:\/\/localhost:8080/resetPassword/'+userEmail);
    },
    async changePassword(req,res){
        let newPass = req.body.password;
        User.update({
            password: newPass
        }, {
            where: {
                email: req.body.email
            }
        });
        res.status(200).send("password updated");
    },
    async getProfile(req, res)
    {
        const email = req.body.email;
        const response = await User.findOne({
            where: {
                email: email
            }
        });
        let userProfile = undefined;
        if(response.dataValues.userType==="applicant"){
            try{
                const getProfileQuery = `SELECT \"Users\".\"password\",\"Users\".\"profileImg\",
                \"Applicants\".\"bio\",\"Applicants\".\"f_name\",\"Applicants\".\"l_name\",\"Applicants\".\"email\"
                    FROM \"Applicants\" INNER JOIN \"Users\" ON \"Applicants\".email = \"Users\".email
                    WHERE \"Applicants\".\"email\" = \'${email}\' AND \"Users\".\"email\"= \'${email}\';`;
                const result = await sequelize.query(getProfileQuery);

                res.status(200).send(result[0][0]);
            }
            catch(err){
                console.log(err);
                res.status(400).send(err);
            }
        }
        else if(response.dataValues.userType==="employer"){
            try{
                const getProfileQuery = `SELECT \"Users\".\"password\",\"Users\".\"profileImg\",
                \"Employers\".\"email\",\"Employers\".\"company_name\",\"Employers\".\"company_description\",\"Employers\".\"year_found\"
                    FROM \"Employers\" INNER JOIN \"Users\" ON \"Employers\".email = \"Users\".email
                    WHERE \"Employers\".\"email\" = \'${email}\' AND \"Users\".\"email\"= \'${email}\';`;
                const result = await sequelize.query(getProfileQuery);

                res.status(200).send(result[0][0]);
            }
            catch(err){
                console.log(err);
                res.status(400).send(err);
            }
        }
    },
    async updateApplicantProfile(req, res){
        try{
            const response = await Applicant.update({
                f_name:req.body.email.f_name,
                l_name:req.body.email.l_name,
                bio:req.body.email.bio,
            },
            {
                where:{
                    email:req.body.email.email
                }
            });
            res.status(200).send(response);
        }
        catch(err){
            console.log(err);
            console.log("wtf???");
            res.status(400).send(err);
        }
    },
    async updateEmployerProfile(req, res){
        try{
            const response = await Employer.update({
                company_name:req.body.email.company_name,
                year_found:req.body.email.year_found,
                company_description:req.body.email.company_description,
            },
            {
                where:{
                    email:req.body.email.email
                }
            });
            res.status(200).send(response);
        }
        catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    }
};