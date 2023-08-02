const sequelize = require('./db');

sequelize.sync();

// Help for calling address from frontend
let cors = require('cors');

// Import express
let express = require('express');

// Initialize the app
let app = express();

app.use(express.json());
app.use(cors());

let session = require("express-session")
app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}))

// Router
let router = require('./router');

app.use('/', router);

//setting middleware
// app.use(express.static('public'));

// Manage bad route
app.use((request, response) => {
    response.setHeader('Content-Type', 'text/plain');
    response.status(404).send('Service introuvable !');
});

// Setup server port
let port = 8000;

// Launch app to listen to specified port
app.listen(port, function () {
    console.log('Server running on port ' + port);
});