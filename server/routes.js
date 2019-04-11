<<<<<<< HEAD
const AuthenticationController = require('./controllers/AuthenticationController')
const DocumentManagement = require('./controllers/DocumentController')
=======
const AuthenticationController = require('./controllers/AuthenticationController');
const JobController = require('./controllers/JobController');
const verificationcontroller = require('./controllers/verificationcontroller');
const ApplicantController = require('./controllers/ApplicantController');
const EmployerController = require('./controllers/EmployerController');

>>>>>>> e75383022b63759a872028ee7ae182e0c3d1f534
const multer = require('multer');
// Controllers are essentially endpoints (Controllers control the responds to the request)
// Routes points to controllers aka endpoints which will perform some action
// to respond to the request from the client
const upload = multer({
    dest: './uploads/'
})

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
