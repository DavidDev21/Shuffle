const AuthenticationController = require('./controllers/AuthenticationController');
const JobController = require('./controllers/JobController');
const verificationcontroller = require('./controllers/verificationcontroller');
const ApplicantController = require('./controllers/ApplicantController');
const EmployerController = require('./controllers/EmployerController');
const AccountController = require('./controllers/AccountController');

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
    accessKeyId: "ASIAZ2SCCNQ4FDN36V6Z", 
    secretAccessKey: "F2tNcxDKYs2Nws2jKwwNZ6zM/wamqoCsUaEq5sYZ",
    sessionToken: "FQoGZXIvYXdzEJX//////////wEaDFfn1fslRQPDdPn0UCL5ArErNsFBi286ZPfQF0f2t2/xDHBj+SHS3NsnrJ4Zph6vbC6V5C3hvULEHGeUQYc0148fh6KxPz22v/GGHd3ZmQrraxyT177V1Eqyrp3S0gAkBh/o7qDBuf7RFVJtFtWxJjOttirsm8HWc5d8rzEvZaFORM9aZX8FCmyOfJoO20SJ/QjONOQ+DhQ7V3G74bhZd42xVDIMSGYuFkg3NNI+b6XtLL97pj8DUIm1PV7u6KYcxRRWaQzRXpjACoNr9BIAVo8aDrRgBaWYhraqh5m5P/ppAsAb87xKiBYU9jeDYeeBFEHffXtMxjTYKamRrYVkXqZ48EaonnSuvRlD1Ft9rIzkCegOArarkfjHhyOC/BHRruZuEYhVeCaxRixir87ksFVGBbaN1VQK5zvRO/2rNOZhNq3Uyo9rkJ+sjOYooedIUsi1ww3+nq43C/SbBmOB75JN4j676f9gMGM1Jry6Wn21u8WnfKZdqU6sxMoDum0dzkNdYkK+gr3NKIyMn+YF" });

const s3 = new aws.S3({});


const storage = multerS3({
    s3: s3,
    bucket: 'shuffleproject',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        const fileExt = path.extname(file.originalname).toLowerCase();
        allowedExts = new Set(['.png','.jpg', '.doc','.docx','.pdf']);
        let folderGroup = undefined;
        if(!allowedExts.has(fileExt))
        {
            cb(new Error('Mime Type not supported'));
        }
        else if(fileExt === '.png' || fileExt === '.jpg')
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

let varietyUpload = upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'profileImg', maxCount: 1 }])

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

    app.post('/get-profile', AccountController.getProfile);
    app.post('/update-applicant-profile', varietyUpload, AccountController.updateApplicantProfile);
    app.post('/update-employer-profile', varietyUpload, AccountController.updateEmployerProfile);

    // app.get('/change-password/:email', AccountController.redirectToNewPass);
    app.post('/change-password', AccountController.changePassword);
    app.post('/sendResetEmail',AccountController.sendResetEmail);

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
