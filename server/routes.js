const AuthenticationController = require('./controllers/AuthenticationController');
const JobController = require('./controllers/JobController');
const verificationcontroller = require('./controllers/verificationcontroller');
const ApplicantController = require('./controllers/ApplicantController');
const EmployerController = require('./controllers/EmployerController');

const multer = require('multer');
const crypto =  require('crypto');
const path = require('path');
const {Document} = require('./models');

// Controllers are essentially endpoints (Controllers control the responds to the request)
// Routes points to controllers aka endpoints which will perform some action
// to respond to the request from the client
const storage = multer.diskStorage({
    //storage location
    destination: function (req, file, cb) {
        const fileExt = path.extname(file.originalname);
        allowedExts = new Set(['.png','jpeg', '.doc','.docx','.pdf']);

        if(!allowedExts.has(fileExt))
        {
            cb({error: 'Mime Type not supported'});
        }
        else if(fileExt === '.png' || fileExt === '.jpeg')
        {
            // this is physical location? __dirname would give you the path to this folder we are in
            cb(null, path.join(__dirname, '/uploads/img'));
            // don't actually need the full path since the GET request is already relative to the root directory
            
            // cb(null, '/uploads/img');
        }
        else
        {
            cb(null, path.join(__dirname, '/uploads/documents'));
            // cb(null, '/uploads/documents');
        }
    },
    //custom naming scheme for incoming file
    filename: (req, file, cb) => {
        // hash original filename
        let customFileName = crypto.randomBytes(18).toString('hex');
        fileExtension = path.extname(file.originalname);// get file extension from original file name
        cb(null, customFileName + fileExtension);
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
    app.post('/update-job', JobController.updateJob);
    app.post('/apply-job', upload.single("coverLetter"), JobController.applyJob);
    app.post('/remove-job', JobController.removeJob);
    app.post('/change-job-status', JobController.changeJobStatus);
    app.post('/check-app-status', ApplicantController.getApplicationStatus);

    app.post('/get-job-postings', EmployerController.getJobPostings);
    app.post('/getApplicant', EmployerController.getApplicant);

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

    app.get('/uploads/documents/:fileName', (req,res) => {
        let file = req.params.fileName;
        res.sendFile(path.join(__dirname, '/uploads/documents/',file));
    });

    app.get('/uploads/img/:fileName', (req,res) =>{
        let file = req.params.fileName;
        res.sendFile(path.join(__dirname, '/uploads/img/', file));
    });
}
