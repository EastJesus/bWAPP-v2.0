var express = require('express')
var bodyParser = require('body-parser')
var jsonParser = express.json();

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var mysql = require('mysql');
 
console.log('Get connection ...');
 
var conn = mysql.createConnection({
  database: 'vulns',
  host: "localhost",
  user: "root",
  password: "admin",
  insecureAuth : true
});



app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

conn.query('SELECT * FROM user', function(err, rows, fields){
    if(err) throw err;
    console.log(rows)
})
const name = "Alexey"
var sql = `SELECT * FROM user WHERE username = '${name}'`
conn.query(sql, function(err, rows, fields) {
    if(err) throw err;
    console.log(rows)
})

app.listen(8080, function() {
    console.log('Listen on 8080...')
})

app.get('/api/getUser/:name', function(req, res) {
    console.log(req.params['name'])
    const userName = req.params['name']
    console.log(userName)
    var sqlquery = `SELECT username, lastname, email FROM user WHERE username = '${userName}'`;
    console.log(sqlquery)
    conn.query(sqlquery, function(err, rows, fields) {
        if(err) throw err;
        res.send(rows);
        console.log(rows);
    })
})


app.get('/api/allUsers', function(req, res) {
    conn.query('SELECT * FROM user', function(err, rows, fields) {
        if(err) throw err;
        res.send(rows);
    })
})