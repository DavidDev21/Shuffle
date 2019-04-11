const {User} = require('../models')
const {Applicant} = require('../models')
const {Employer} = require('../models')

module.exports = {
    async register (req, res) {
        try 
        {
<<<<<<< HEAD
            const user = await User.create({
                userEmail: req.body.email,
                userPassword: req.body.password,
                userType: req.body.userType
            })
=======
            // sgMail.setApiKey('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');

            const user = await User.create({
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType,
                profileImg: req.body.profileImg
            });

            const token = await verificationtoken.create({ 
                userID: user.id, 
                token: crypto.randomBytes(16).toString('hex') 
            });

            const msg = {
                to: user.email,					//receiver's email
                from: 'no-reply@example.com',			//sender's email
                subject: 'verify your email',				//Subject
                text: 'Click on this link to verify your email ${hostUrl}/verification',		//content
                html: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/'+token.token+'.\n',			//HTML content
              };

            // sgMail.send(msg);
            
>>>>>>> e75383022b63759a872028ee7ae182e0c3d1f534
            if(req.body.userType === 'applicant')
            {
                const applicant = await Applicant.create({
                    email: req.body.email,
                    f_name: req.body.fName,
                    l_name: req.body.lName,
                    major: req.body.major,
<<<<<<< HEAD
                    grad_year: req.body.gradYear
                })
=======
                    grad_year: req.body.gradYear,
                    bio: req.body.bio
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
>>>>>>> e75383022b63759a872028ee7ae182e0c3d1f534
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

            res.json({file: req.file});
        }
        catch(err)
        {
<<<<<<< HEAD
            console.log(err)
=======
            // Uniqueness Errors
            console.log(err.errors[0].message);
            res.status(400).send(err.errors[0].message);
>>>>>>> e75383022b63759a872028ee7ae182e0c3d1f534
        }
        res.status(200).send(
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
<<<<<<< HEAD
            if(response.length > 0)
            {
                res.status(200).send('Access Granted')
            }            
            else
            {
                res.status(401).send('Access Denied')
=======

            if(response !== null && response.dataValues.isVerified === true)
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
                userData.dataValues.profileImg = response.dataValues.profileImg;
                res.status(200).send(userData.dataValues);
            }          
            else if(response !== null && response.dataValues.isVerified === false)
            {
                res.status(402).send('Please verified your email');
            }  
            else
            {
                res.status(401).send('Access Denied: Invalid Username or Password');
>>>>>>> e75383022b63759a872028ee7ae182e0c3d1f534
            }

        }
        catch(err)
        {
            console.log(err);
            res.status(400).send('Bad Request');
        }
    }
}