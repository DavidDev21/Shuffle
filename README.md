# Shuffle
CS 4513 / 4523 - Software Engineering Project

# Tech Stack (VERP)
1. Vuejs
2. Nodejs
3. PostgresSQL (Transitioning from MySQL)
4. Express

# Installation
```
1.) clone the repo into your desired directory using git
2.) cd into the directory you just clone the repo into
3.) go into the server folder and run: npm install
  (This reads the package.json file and installs all the node packages that the server needs)
  Packages:
    Express
    body-parser (allows you to parse through http request body)
    sequelize (an ORM to manage our database, and allow for some validation policies like email formats, etc)
    bcrypt (used to hash / encrypt sensitive user data, like passwords)
    jwt (not in use / installed, generates tokens that we can use to keep the user login and other token related features)
    ... (some others I don't remember at the moment)
    
4.) go to the client folder and run: npm install
  (This reads the package.json file and installs all the node packges that the client needs)
  Packages:
    Vuejs
    Vue-bootstrap
    axios
    font-awesome (not currently being used ... I think)
    jQuery/popper.js (not being used, not sure if installed, but useful for making elements draggable)

```

# Dev Environment
```
# Running front-end (Go to client folder)
npm run dev # to run dev server

# Running back-end (Go to server folder)
npm run dev # to run dev server

# Changing database config
1.) Go to server folder
2.) Go to config folder
3.) Modify config.js file with your database login credentials if you changed it. Currently set to default credentials.
```

# Potential Issues
1. axios package has 2 vulnerabilities. 
2. If you changed your database login credentials, you can either change it back to the default, or add them into the config.js in the server folder
3. Currently not setup to be deployed for hosting (to be changed)
