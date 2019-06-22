var mysql = require('mysql');

var conn = mysql.createConnection({
    database: 'vulns',
    host: "localhost",
    user: "root",
    password: "admin",
    insecureAuth : true
});

module.exports = {

    connectToDB: () => {
        conn.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });
    },

    viewAllUsers: () => {
        conn.query('SELECT * FROM user', function(err, rows, fields){
            if(err) throw err;
            console.log(rows)
        })
    }
}
module.exports.conn = conn