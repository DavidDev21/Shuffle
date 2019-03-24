<<<<<<< HEAD
const AuthenticationController = require('./controllers/AuthenticationController')
const multer = require('multer');
const crypto =  require('crypto');
const path = require('path');
=======
const AuthenticationController = require('./controllers/AuthenticationController');
const JobController = require('./controllers/JobController');
const verificationcontroller = require('./controllers/verificationcontroller');
const multer = require('multer');
const crypto =  require('crypto');
const path = require('path');
const {Document} = require('./models');
>>>>>>> 3a8d5fd19024bc6772fc175a2b5a11d99a8c88d3

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
<<<<<<< HEAD
            cb(null, path.join(__dirname, '/uploads/img'));
=======
            // this is physical location? __dirname would give you the path to this folder we are in
            cb(null, path.join(__dirname, '/uploads/img'));
            // don't actually need the full path since the GET request is already relative to the root directory
            
            // cb(null, '/uploads/img');
>>>>>>> 3a8d5fd19024bc6772fc175a2b5a11d99a8c88d3
        }
        else
        {
            cb(null, path.join(__dirname, '/uploads/documents'));
<<<<<<< HEAD
=======
            // cb(null, '/uploads/documents');
>>>>>>> 3a8d5fd19024bc6772fc175a2b5a11d99a8c88d3
        }
    },
    //custom naming scheme for incoming file
    filename: (req, file, cb) => {
        // hash original filename
        let customFileName = crypto.randomBytes(18).toString('hex');
        fileExtension = path.extname(file.originalname);// get file extension from original file name
        cb(null, customFileName + fileExtension);
    }
<<<<<<< HEAD
  })

const upload = multer({
    storage: storage
})

module.exports = (app) => {
    app.post('/register', upload.single("file"), AuthenticationController.register)
    app.post('/login', AuthenticationController.login)

    //     // get endpoints
    // app.get('/', (req, res) => {
    //     res.send('This is working');
    // });

    // // post endpoints
    // app.post('/register', (req,res) => {
    //     console.log('Register Endpoint Reached VIA POST')
    //     if(req.body.userType === 'applicant')
    //     {
    //         console.log('Received Applicant info')
    //     }
    //     else if(req.body.userType === 'employer')
    //     {
    //         console.log('Received Employer info')
    //     }
    //     console.log(req.body)
    //     res.send(req.body);
    // });

    // app.post('/login', (req,res) => {
    //     res.status(200).send({
    //         userType: 'applicant'
    //     })
    // });

    // app.post('/getJob', (req, res) => {
    //     res.send({
    //         img_path: '../../assets/ShuffleIcon.png',
    //         jobTitle: 'This worked'
    //     })
    // })
=======
  });

const upload = multer({
    storage: storage
});

module.exports = (app) => {
    // POST Routes
    app.post('/register', upload.single("file"), AuthenticationController.register);
    app.post('/login', AuthenticationController.login);
    app.post('/confirmation',verificationcontroller.verify);
    app.post('/get-job', JobController.getJob);
    app.post('/post-job', JobController.postJob);
    // app.post('/remove-job/:jobID', JobController.removeJob);
    // app.post('/check-status', JobController.getStatus);

    // app.post('/get-applicants/:jobID', ApplicantController.getApplicants);
    // app.post('/get-posted-jobs', JobController.getPostedJobs);

    // app.post('/update-applicant-profile', AccountController.updateApplicantProfile);
    // app.post('/update-employer-profile', AccountController.updateEmployerProfile);

    // app.post('/change-password', AccountController.changePassword);

    // GET Routes
    // The Frontend just needs to indicate the GET request path in the "src" attribute
    // All filenames should come with the file extensions
    app.get('/assets/:assetName', (req,res) => {
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
>>>>>>> 3a8d5fd19024bc6772fc175a2b5a11d99a8c88d3
}