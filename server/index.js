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

require('./routes')(app)

sequelize.sync({force:true})
    .then(() => {
        app.listen(config.port, () => console.log(`Server listening on port: ${config.port}`));
    })
