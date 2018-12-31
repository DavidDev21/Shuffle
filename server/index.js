const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// insantitate express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// routing
const port = process.env.PORT || 5000;

// get endpoints
app.get('/', (req, res) => {
    res.send('This is working');
});

// post endpoints
app.post('/register', (req,res) => {
    console.log('Register Endpoint Reached VIA POST')
    res.send(req.body);
});

app.listen(port, () => console.log(`Server listening on port: ${port}`));

