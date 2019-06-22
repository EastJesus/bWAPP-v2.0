module.exports = (app, db) => {
    app.get('/api/getUser/:name', function(req, res) {
        console.log(req.params['name'])
        const userName = req.params['name']
        console.log(userName)
        var sqlquery = `SELECT username, lastname, email FROM user WHERE username = '${userName}'`;
        console.log(sqlquery)
        db.conn.query(sqlquery, function(err, rows, fields) {
            if(err) throw err;
            res.send(rows);
            console.log(rows);
        })
    })

    app.get('/api/allUsers', function(req, res) {
        db.conn.query('SELECT * FROM user', function(err, rows, fields) {
            if(err) throw err;
            res.send(rows);
        })
    })

    app.get('/auth/:name', function(req, res) {
        const user = req.params['name'];
        console.log(user);
        var sqlquery = `SELECT login, password FROM user WHERE login = '${user}'`;
        db.conn.query(sqlquery, function(err, rows, fields) {
            if(err) throw err;
            res.send(rows);
            console.log(rows[0]);
        })
    })
}

