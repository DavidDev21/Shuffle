# Shuffle
CS 4513 / 4523 - Software Engineering Project

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
```

# Potential Issues
> axios package has 2 vulnerabilities. 
> 
