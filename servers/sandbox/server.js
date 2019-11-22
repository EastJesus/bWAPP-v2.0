var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var connection = require('./db')
var cors = require('cors')

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


connection.connectToDB()
console.log('Get connection ...');
require('./api')(app, connection);

app.listen(8080, function() {
    console.log('Listen on 8080...')
})







