const {User} = require('../models');
const {verificationtoken} = require('../models');
const crypto =  require('crypto');
const sgMail = require('@sendgrid/mail');
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
        const response = await User.findOne({
            where: {
                id: req.body.id
            }
        });
        let userProfile = undefined;
        if(response.dataValues.userType==="applicant"){
            userProfile = await Applicant.findOne({
                where: {
                    email: response.dataValues.email
                }
            });
        }
        else if(response.dataValues.userType==="employer"){
            userProfile = await Applicant.findOne({
                where: {
                    email: response.dataValues.email
                }
            });
        }
        console.log(userProfile);
        res.send(userProfile);
    },
    async updateApplicantProfile(req, res){
        
    },
    async updateEmployerProfile(req, res){
        
    }
};