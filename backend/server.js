// Imports
var express = require('express');
const bodyParser = require('body-parser');
const apiRouter   = require('./apiRouter').router;

// Instantiate server
var server = express();

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Access Control 
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Configure routes
server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon serveur</h1>');
});

server.use('/api/', apiRouter);

// Launch server
const port = 4201

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});