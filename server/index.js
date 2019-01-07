const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sequelize} = require('./models');
const config = require('./config/config');

// insantitate express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// get endpoints
app.get('/', (req, res) => {
    res.send('This is working');
});

// post endpoints
app.post('/register', (req,res) => {
    console.log('Register Endpoint Reached VIA POST')
    if(req.body.userType === 'applicant')
    {
        console.log('Received Applicant info')
    }
    else if(req.body.userType === 'employer')
    {
        console.log('Received Employer info')
    }
    console.log(req.body)
    res.send(req.body);
});

app.post('/login', (req,res) => {
    res.status(200).send({
        userType: 'applicant'
    })
});

sequelize.sync({force:true})
    .then(() => {
        app.listen(config.port, () => console.log(`Server listening on port: ${config.port}`));
    })
