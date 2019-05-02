const {User} = require('../models');
const sgMail = require('@sendgrid/mail');
const {Applicant} = require('../models');
const {Employer} = require('../models');
const {sequelize} = require('../models');
const {ApplicantDoc} = require('../models');
const {Document} = require('../models');
const path = require('path');
const fs = require('fs');
const aws = require('aws-sdk');

aws.config.update({ 
    accessKeyId: "", 
    secretAccessKey: ""  });

const s3 = new aws.S3({});

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
                }})
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
        console.log(user)
        if(user!==null){
            if(user.dataValues.isVerified==true){
                sgMail.setApiKey('TO BE FILLED');
                console.log(req.body.email);
                console.log(req.headers.host);
                const msg = {
                    to: req.body.email,					//receiver's email
                    from: 'no-reply@example.com',			//sender's email
                    subject: 'Please update your password using this link',				//Subject
                    text: 'Click on this link to change your password',		//content
                    html: 'Hello,\n\n' + 'Please change your password by clicking the link: \nhttps:\/\/' + req.headers.host + '\/change-password\/'+ req.body.email +'\n',			//HTML content
                  };
                sgMail.send(msg);
                res.status(200).send('Reset Link sent');
            }
            else{
                res.status(404).send('Email not verified yet.')
            }
        }
        else{
            res.status(404).send('Email not found');
        }
    },
    //get new password from web form
    async redirectToNewPass(req,res){
        //let userEmail = req.params.email;
        // res.status(200).redirect('https:\/\/shuffleproject.herokuapp.com/change-password/' + req.params.email);
        res.status(200).redirect('https:\/\/localhost:8080/change-password/'+req.params.email);
        //res.status(200).redirect('http:\/\/localhost:8080/resetPassword/'+userEmail);
    },
    async changePassword(req,res){
        console.log("I amhere")
        let newPass = req.body.password;
        try {
            await User.update({
                password: newPass
            }, {
                where: {
                    email: req.body.email
                }
            });
            res.status(200).send("password updated");
        }
        catch(error)
        {
            console.log(error);
            res.status(400).send(error);
        }
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
            console.log(req.body.password);
            await User.update({
                password: req.body.password
            }, {
                where: {
                    email: req.body.email
                }
            });

            await Applicant.update({
                f_name:req.body.f_name,
                l_name:req.body.l_name,
                bio:req.body.bio,
            },
            {
                where:{
                    email:req.body.email
                }
            });

            // if there is a new resume
            if(req.files.resume !== undefined)
            {
                // destory old entries
                const response = await ApplicantDoc.findOne({
                    where: {
                        email: req.body.email,
                        main_resume: true
                    }
                });
                if(response !== null)
                {
                    const docEntry = await Document.findOne({
                        where: {
                            email: req.body.email,
                            documentID: response.dataValues.documentID
                        }
                    });

                    // S3 destroy
                    s3.deleteObject({
                        Bucket: 'shuffleproject1',
                        Key: docEntry.dataValues.filePath
                    }, function(error, data) {
                        if(error)
                        {
                            console.log(error);
                        }
                        console.log(data);
                    });
                    
                    await ApplicantDoc.destroy({
                        where: {
                            email: req.body.email,
                            documentID: response.dataValues.documentID
                        }
                    });

                    await Document.destroy({
                        where: {
                            owner: req.body.email,
                            documentID: response.dataValues.documentID
                        }
                    });
                }
                    

                // straight copy from AuthenticationController.js
                let docID = undefined;
                // console.log(path.resolve(__dirname,".."));

                // strips apart the server path from the full path of where the file is stored
                // the docPath should match what the GET route for the files are
                let serverPath = path.resolve(__dirname, "..");
                // let docPath = req.files.resume[0].path.substring(serverPath.length);
                
                //path.join(serverPath, "/uploads/documents", req.file.filename);
                //console.log(docPath);
                // console.log(req.file.path.substring(path.join("..",__dirname).length));
                const doc = await Document.create({
                    owner: req.body.email,
                    documentType: 'resume',
                    filePath: req.files.resume[0].key
                });

                docID = doc.dataValues.documentID;

                if(docID !== undefined)
                {
                    const appDoc = await ApplicantDoc.create({
                        email: req.body.email,
                        documentID: docID,
                        main_resume: true
                    });
                }
            }

            if(req.files.profileImg !== undefined)
            {
                const response = await User.findOne({
                    where: {
                        email: req.body.email
                    }
                });
                
                // detect if its default profile img
                // the file names should never contain /assets sinces it has been hashed
                if(response.dataValues.profileImg.includes('/assets') === false)
                {
                    // delete the old file
                    // let absPath = path.join(__dirname, '..', response.dataValues.profileImg);
                    s3.deleteObject({
                        Bucket: 'shuffleproject1',
                        Key: response.dataValues.profileImg
                    }, function(error, data) {
                        if(error)
                        {
                            console.log(error);
                        }
                        console.log(data);
                    });
                }
                
                // let serverPath = path.resolve(__dirname, "..");
                // let filePath = req.files.profileImg[0].path.substring(serverPath.length);

                // update the entry in the database
                await User.update({
                    profileImg: req.files.profileImg[0].key
                },{
                    where: {
                        email: req.body.email
                    }
                });
            }
            res.status(200).send("Applicant Profile Updated");
        }
        catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    },
    async updateEmployerProfile(req, res){
        try{
            await User.update({
                password: req.body.password
            }, {
                where: {
                    email: req.body.email
                }
            });
            await Employer.update({
                company_name:req.body.company_name,
                year_found:req.body.year_found,
                company_description:req.body.company_description,
            },
            {
                where:{
                    email:req.body.email
                }
            });

            if(req.files.profileImg !== undefined)
            {
                const response = await User.findOne({
                    where: {
                        email: req.body.email
                    }
                });
                
                // detect if its default profile img
                // the file names should never contain /assets sinces it has been hashed
                if(response.dataValues.profileImg.includes('/assets') === false)
                {
                    // delete the old file
                    s3.deleteObject({
                        Bucket: 'shuffleproject1',
                        Key: response.dataValues.profileImg
                    }, function(error, data) {
                        if(error)
                        {
                            console.log(error);
                        }
                        console.log(data);
                    });
                }
                
                // update the entry in the database
                await User.update({
                    profileImg: req.files.profileImg[0].key
                },{
                    where: {
                        email: req.body.email
                    }
                });
            }
            res.status(200).send("Employer Profile Updated");
        }
        catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    }
};