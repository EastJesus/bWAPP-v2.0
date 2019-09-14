module.exports = (app, db) => {
    app.get('/api/getUser/:name', function(req, res) {
        console.log(req.params['name'])
        const userName = req.params['name']
        console.log(userName)
        var sqlquery = `SELECT username, lastname, email FROM users WHERE username = '${userName}'`;
        console.log(sqlquery)
        db.conn.query(sqlquery, function(err, rows, fields) {
            if(err) throw err;
            res.send(rows);
            console.log(rows);
        })
    })

    app.get('/api/allUsers', function(req, res) {
        db.conn.query('SELECT * FROM users', function(err, rows, fields) {
            if(err) throw err;
            res.send(rows);
        })
    })

    app.get('/api/auth/:name', function(req, res) {
        const user = req.params['name'];
        console.log(user);
        var sqlquery = `SELECT isAdmin, username, password FROM users WHERE username = '${user}'`;
        db.conn.query(sqlquery, function(err, rows, fields) {
            if(err) throw err;
            res.send(rows);
            console.log(rows[0]);
        })
    })

    app.get('/api/adminGetUsers', function(req, res) {
        let query = 'SELECT * FROM users'
        db.conn.query(query, function(err, rows, fields) {
            if(err) throw err
            res.send(rows)
            console.log(rows)
        })
    })

    app.post('/api/deleteUser/:index', function(req, res) {
        const id = req.params['index']
        let newID = +id
        let query = `DELETE FROM users WHERE id = ${newID}`
        db.conn.query(query, function(err, rows, fields) {
            if(err) throw err
            res.send(rows)
        })
        console.log(newID)
        
    })
    app.post('/api/newUser', function(req, res) {
        console.log('get newUser')
        console.log(req.body)
        let user = req.body.user
        let isAdmin = user.isAdmin == true ? 1 : 0
        let query = `INSERT INTO users (name, lastname, username, password, email, isAdmin)
                     VALUES ('${user.name}', '${user.lastname}', 
                     '${user.login}', '${user.password}', '${user.email}', '${isAdmin}')`
        db.conn.query(query, function(err, rows, fields) {
            if(err) throw err
        })       
        res.send('success')      
    })

    app.post('/api/upload', function(req, res) {
        console.log(req.body)
        res.send(req.body)
    })
}

