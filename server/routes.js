const AuthenticationController = require('./controllers/AuthenticationController');
const JobController = require('./controllers/JobController');
const verificationcontroller = require('./controllers/verificationcontroller');
const ApplicantController = require('./controllers/ApplicantController');
const EmployerController = require('./controllers/EmployerController');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const crypto =  require('crypto');
const path = require('path');
const {Document} = require('./models');

// Controllers are essentially endpoints (Controllers control the responds to the request)
// Routes points to controllers aka endpoints which will perform some action
// to respond to the request from the client

// {
//     //storage location
//     destination: function (req, file, cb) {
//         const fileExt = path.extname(file.originalname);
//         allowedExts = new Set(['.png','jpeg', '.doc','.docx','.pdf']);

//         if(!allowedExts.has(fileExt))
//         {
//             cb({error: 'Mime Type not supported'});
//         }
//         else if(fileExt === '.png' || fileExt === '.jpeg')
//         {
//             // this is physical location? __dirname would give you the path to this folder we are in
//             cb(null, path.join(__dirname, '/uploads/img'));
//             // don't actually need the full path since the GET request is already relative to the root directory
            
//             // cb(null, '/uploads/img');
//         }
//         else
//         {
//             cb(null, path.join(__dirname, '/uploads/documents'));
//             // cb(null, '/uploads/documents');
//         }
//     },
//     //custom naming scheme for incoming file
//     filename: (req, file, cb) => {
//         // hash original filename
//         let customFileName = crypto.randomBytes(18).toString('hex');
//         fileExtension = path.extname(file.originalname);// get file extension from original file name
//         cb(null, customFileName + fileExtension);
//     }
//   }


// const storage = multer.diskStorage();

// NOTE: AWS EDUCATE STARTER ACCOUNT REFRESHES THEIR KEYS AFTER AN HOUR
aws.config.update({ 
    accessKeyId: "ASIAZ2SCCNQ4BSAR6FIY", 
    secretAccessKey: "+04wrbeKg03zo+UwK/K97qBgEdoel+UKPjXL27oD", 
    sessionToken: "FQoGZXIvYXdzEM7//////////wEaDMYGqY8zRxtCWvIlsyL5AgtSD9FkSk1uppSOO+CHZEmkXDqHEzrzVY3puFPHxzug21Z1r9L+NpiRGqvHoj3E52MvmgrGiiuaaCRr1sQYZotLsaMErSODTXeIGNvLDZ4VaPsPK6g9yhW6sjy4lmqKLxumH2JAf58jhUErSuVEHkoGcruTDWxMx1Kai/xm/BUaR2DLvMD5eYJQT/weffI/p6bkZLRO+3SHyY/B1jgt4wQxV3MymXfsr3GCr5juF7UebuQbJYLQJkW94LlkEkLPGEgkzVsCPHWUu9W70vtHi9t+4cP/CxurhYK/AttHANVKjXp9Oy1qMGBq9bngQZ4JXYAO7sQ/ILu3sRi7MyVDiv5ktLG2sK4ERbVCJPcb+oxeZ3Ivw3gOd2s4m8RWZ8sxkzRIX7c9FmkRugWk4hp6GZVo92JxFelKzkJYV/Zpo5doN3DTBdZ40tYhFgs4Qn9WtFzVPjFNLQOBAmkZe4HoG9Ty3EN8bVmMvffJn51BZLbpnjQ5UU4/635VKJie8+UF" });

const s3 = new aws.S3({});


const storage = multerS3({
    s3: s3,
    bucket: 'shuffleproject',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        const fileExt = path.extname(file.originalname);
        allowedExts = new Set(['.png','jpeg', '.doc','.docx','.pdf']);
        let folderGroup = undefined;
        if(!allowedExts.has(fileExt))
        {
            cb({error: 'Mime Type not supported'});
        }
        else if(fileExt === '.png' || fileExt === '.jpeg')
        {
            folderGroup = '/uploads/img/' ;           
        }
        else
        {
            folderGroup = '/uploads/documents/';

        }
        // hash original filename
        let customFileName = crypto.randomBytes(18).toString('hex');
        fileExtension = path.extname(file.originalname);// get file extension from original file name
        cb(null, folderGroup + customFileName + fileExtension);
    }
  });

const upload = multer({
    storage: storage
});

module.exports = (app) => {
    // POST Routes
    app.post('/register', upload.single("file"), AuthenticationController.register);
    app.post('/login', AuthenticationController.login);
    app.get('/confirmation/:userToken',verificationcontroller.verify);

    app.post('/get-job', JobController.getJob);
    app.post('/post-job', JobController.postJob); // profile img of employer should already be in database
    app.post('/update-job', JobController.updateJob); // change job posting info
    app.post('/apply-job', upload.single("coverLetter"), JobController.applyJob);
    app.post('/remove-job', JobController.removeJob);
    app.post('/change-job-status', JobController.changeJobStatus); // close the job opening

    app.post('/check-app-status', ApplicantController.getApplicationStatus);
    app.post('/change-app-status', EmployerController.changeApplicationStatus);
    app.post('/get-job-postings', EmployerController.getJobPostings);
    app.post('/get-applicant', EmployerController.getApplicant);

    app.post('/withdraw-application', ApplicantController.withdrawApplication);

    // app.post('/get-applicants/:jobID', ApplicantController.getApplicants);
    // app.post('/get-posted-jobs', JobController.getPostedJobs);

    // app.post('/get-profile/:userID), AccountController.getProfile);
    // app.post('/update-applicant-profile', AccountController.updateApplicantProfile);
    // app.post('/update-employer-profile', AccountController.updateEmployerProfile);

    // Assuming Server ever sent the userID when they login
    // app.post('/change-email/:userID, AccountController.changeEmail);
    // app.post('/change-password/:userID', AccountController.changePassword);

    // GET Routes
    // The Frontend just needs to indicate the GET request path in the "src" attribute
    // All filenames should come with the file extensions
    app.get('/assets/:assetName', (req,res) => {
        console.log('get assests');
        res.sendFile(path.join(__dirname, '/assets/', req.params.assetName));
    });

    /*
        the "filePath" in the database is the key for the Object in the S3 Bucket
        the key also happens to be matching the API URL endpoint like ('/uploads/documents/....')
        this could be changed, but right now it is a matter of convenience 
    */


    app.get('/uploads/documents/:fileName', (req,res) => {
        let file = req.params.fileName;
        let s3ObjectKey = req.url;
        s3.getObject({
            Bucket: "shuffleproject",
            Key: s3ObjectKey,
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }

            // Headers
            res.set("Content-Length",data.ContentLength)
            .set("Content-Type",data.ContentType);
            res.send(data.Body);
        });

        // this is a slightly better way to get the data from AWS
        // if the file is large, we can stream the data to the client as it is coming from AWS
        // rather than waiting for the data to buffer
        // }).on('httpHeaders', function (statusCode, headers) {
        //     res.set('Content-Length', headers['content-length']);
        //     res.set('Content-Type', headers['content-type']);
        //     this.response.httpResponse.createUnbufferedStream()
        //         .pipe(res);
        // })
        // .send();

        // res.sendFile(path.join(__dirname, '/uploads/documents/',file));
    });

    app.get('/uploads/img/:fileName', (req,res) =>{
        let s3ObjectKey = req.url;

        s3.getObject({
            Bucket: "shuffleproject",
            Key: s3ObjectKey,
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            // Headers
            res.set("Content-Length",data.ContentLength)
            .set("Content-Type",data.ContentType);
            res.send(data.Body);
        });
        // let file = req.params.fileName;
        // res.sendFile(path.join(__dirname, '/uploads/img/', file));
    });
}
