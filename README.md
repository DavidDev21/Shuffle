# Demo
https://shuffleproject.herokuapp.com/

# Shuffle
CS 4513 / 4523 - Software Engineering Project

# Tech Stack (VERP)
1. Vuejs
2. Nodejs
3. PostgresSQL
4. Express

# Installation
```
1.) clone the repo into your desired location using git

2.) cd into the directory you just clone the repo into

3.) go into the shuffle folder and run: npm install
(This installs all packages required)    

4.) go to the client2 folder and run: npm install

Go to package.json to see packages / dependencies
```

# Dev Environment
```
# Running front-end (Go to client2 folder)
npm run serve

# Running back-end (Go to shuffle folder, not inside the server folder)
npm run dev

# Changing database config
1.) Go to server folder
2.) Go to config folder
3.) Modify config.js file with your database login credentials if you changed it. Currently set to default credentials.

Note: both front-end and back-end servers must be running together for some functionalities to work
```

# Potential Issues
1. If you changed your database login credentials, you can either change it back to the default, or add them into the config.js in the server folder
2. Currently not setup to be deployed for hosting (to be changed)
