const AuthenticationController = require('./controllers/AuthenticationController');
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
            // cb(null, path.join(__dirname, '/uploads/img'));
            // don't actually need the full path since the GET request is already relative to the root directory
            // 
            cb(null, '/uploads/img');
        }
        else
        {
            // cb(null, path.join(__dirname, '/uploads/documents'));
            cb(null, '/uploads/documents');
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
    
    // GET Routes
    // The Frontend just needs to indicate the GET request path in the "src" attribute
    app.get('/assets/no_profile_icon.png', (req,res) => {
        res.sendFile(path.join(__dirname+'/assets/no_profile_icon.png'));
    })
    app.get('/assets/no_image_icon.png', (req,res) => {
        res.sendFile(path.join(__dirname+'/assets/no_image_icon.png'));
    })

    app.get('/uploads/documents/:fileName', (req,res) => {
        let file = req.params.fileName
        res.sendFile(path.join(__dirname, '/uploads/documents/',file));
    })

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
}