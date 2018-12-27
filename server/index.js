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

app.get('/', (req, res) => {
    res.send('This is working');
});

app.listen(port, () => console.log(`Server listening on port: ${port}`));

