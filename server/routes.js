const AuthenticationController = require('./controllers/AuthenticationController')
const DocumentManagement = require('./controllers/DocumentController')
const multer = require('multer');
// Controllers are essentially endpoints (Controllers control the responds to the request)
// Routes points to controllers aka endpoints which will perform some action
// to respond to the request from the client
const upload = multer({
    dest: './uploads/'
})

module.exports = (app) => {
    app.post('/register', upload.single("file"), AuthenticationController.register)
    app.post('/login', AuthenticationController.login)

    // test routes
    app.post('/upload', upload.single("file"), DocumentManagement.upload)
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