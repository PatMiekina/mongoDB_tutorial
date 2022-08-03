# MongoDB Setup Tutorial

This is a step by step tutorial to set up MongoDB account, create a database, add MongoDB to your project and perform basic CRUD actions. It uses the MVC app model, so it is worth reading a little bit about the subject beforehand. The tutorial was based on [Nishant Kumar's tutorial](https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/).

It is a continuation of [government front-end styling tutorial](https://github.com/PatMiekina/gov-styling), [cypress tutorial](https://github.com/PatMiekina/cypress-tutorial) and [CircleCI tutorial](https://github.com/PatMiekina/circleCI-tutorial).

Big shoutout to marvelous [Donny](https://github.com/donnyhyon) & fabulous [Gabby](https://github.com/gab-bernotaite) for working on a tutorial with me, thanks guys! ❤️

To start the tutorial clone [this github repo](https://github.com/PatMiekina/circleCI-tutorial).


# Setting up the database

1. Create an account on MongoDB through [this link](https://account.mongodb.com/account/login)

2. Upon sign up create a free database (Cluster). Should you have any problems with this part, please refer to [this tutorial](https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/)

3. On the website, set up a username and a password for the database
![password & user setup](https://www.freecodecamp.org/news/content/images/2022/02/Screenshot-2022-02-19-132958.jpeg)

4. Connect from 'My local environment' and add your IP, clicking button 'Add my current IP address'

![connect](https://www.freecodecamp.org/news/content/images/2022/02/Screenshot-2022-02-19-133131.jpeg)

5. Finish and close.

6. You will be moved to your database overview. Click the button 'Connect' to be able to connect your database to your app

![Connect](https://www.freecodecamp.org/news/content/images/2022/02/Screenshot-2022-02-19-133319.jpeg)

7. A pop up will appear - select connecting through MongoDB Compass. In the next step you will be asked if you have it & you will be able to install it.

![Connect through MongoDB Compasss](https://www.freecodecamp.org/news/content/images/2022/02/Screenshot-2022-02-19-133404.jpeg)

![Install MongoDB Compass](https://www.freecodecamp.org/news/content/images/2022/02/Screenshot-2022-02-19-133516.jpeg)

8. Create a .env file and paste the string from the step above to it
```
touch .env
```

in .env (example string, customise it with your username & password)
```
DATABASE_URL = mongodb+srv://nishant:*******@cluster0.xduyh.mongodb.net/testDatabase
```

9. Open MongoDB Compass and paste the same link in there:

![MongoDB Compass](https://www.freecodecamp.org/news/content/images/2022/02/Screenshot-2022-02-19-134347.jpeg)

Click 'Connect'

10. Two databases are created, local & admin and there will be a third one created automatically later on.

![MongoDB Compass Databases](https://www.freecodecamp.org/news/content/images/2022/02/Screenshot-2022-02-19-134435.jpeg)

# Connecting the database to the app

11. Install the missing dependencies (if missing)
```
npm i govuk-frontend --save
```
12. Install Mongoose & Dotenv packages
```
npm i mongoose dotenv
```
13. In *index.js* require configuration from protected dotenv file

```javascript
require('dotenv').config();
```

14. In *index.js* connect the app to the previously created database

```javascript
// add json
app.use(express.json());
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

// test if connected to the database
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
```
# Routing

15. Create a *routes.js* file in src folder -> this is where we will move all the routes that express is using so that index.js is only used to manipulate the logic of the whole app, rather than the logic of each individual route/page

```
touch src/routes.js
```

in *index.js* file remember to require *routes.js* file:
```javascript
const routes = require('./routes');
app.use('/', routes)
```

16. In the *routes.js* file add:
```javascript
const express = require('express');
const router = express.Router();
module.exports = router;
```

Then, cut all the **routes - only routes!** from the *index.js* and paste them into *routes.js*. <span style="color:red">Remember to change app.request_name to router.request_name!</span>

This is what your *index.js* file should look like:

```javascript
// Import protected information from .env file
require('dotenv').config();
// Import the routes file:
const routes = require('./routes');

const express = require('express')
const path = require('path');
const PORT = 3000;
const app = express();

// Connect to database
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.use('/', routes);

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')))

app.listen(PORT, () => {
console.log(`App running on port ${PORT} http://localhost:${PORT}`)
})
```

This is what your *routes.js* file should look like:

```javascript
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const router = express.Router();
module.exports = router;

const Model = require('../models/user');

// Routes from previous tutorials:

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/index.html'))
})

router.get('/start', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/start.html'))
})

router.get('/template', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/template.html'))
})

// Routes from previous tutorials above
```

***routes.js should only be handling the routes & the model - everything else should happen in index.js***

17. At this point test the application by running the server. 

`npm run start`

If anything is not working first and foremost check if the paths to imported files are correct. Read the error messages to find out more about the problem. If the problem persists compare this repo to your files and hopefully this will help!

# Creating a Model
To be able to add to a database we need to create a model that can be stored in it. Broadly speaking, this is an equivalent of a class in Ruby and represents a single type of data, for example Users or Documents. Models have their properties, which in JavaScript are represented as an object (hash), such as name, address, age etc. The ***schema*** is a name for the structure of data in the database.

18. Create a models folder & *user.js* file
```
mkdir models
touch models/user.js
```

19. In *user.js* paste:

```javascript
const mongoose = require('mongoose');
// Schema - structure of data stored in the database
const dataSchema = new mongoose.Schema({
    // each instance of the data type has the properties below:
    name: {required: true, type: String},
    age: {required: true, type: Number}
})

module.exports = mongoose.model('Data', dataSchema)
```

20. Import the user model in *routes.js* file:
```javascript
const Model = require('../models/user');
```

# Part below - not working yet, will be updated

# CRUD actions on the database
Below instructions how to do 5 CRUD actions:
Create, Read, Read all, Updade, Delete. All code to be written in *routes.js* file.

If you don't want to build the front end of the app just yet, [Postman](https://www.postman.com/downloads/) is a great way to test all the queries that you make to the database. If you decide to use it, start the server and in Postman paste the path for the request you want to test & select the type of request (ex Post).
![Postman](https://www.freecodecamp.org/news/content/images/2022/02/Screenshot-2022-02-19-141237.jpeg)

## CREATE (Post request)

ex path: localhost:3000/users/new

```javascript
router.post('/users/new', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        // try to save the data, await makes the request asnchronous
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        // if error occurs the error message is registered
        res.status(400).json({message: error.message})
    }
})
```

## READ

Get one by ID

ex path: localhost:3000/user/1000

```javascript
router.get('/user/:id', (req, res) => {
    res.send(req.params.id)
})
```

Get all

ex path: localhost:3000/users

```javascript
router.get('/users', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
```

## UPDATE

ex path: localhost:3000/update/1000

```javascript
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
```

## DELETE

ex path: localhost:3000/delete/1000

```javascript
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
```