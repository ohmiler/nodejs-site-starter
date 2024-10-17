const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_db'
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    console.log('Connected to MySQL database successfully.');
})

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, results) => {
        if (err) throw err;

        res.render('home', { 
            title: 'Home',
            users: results
        });
    })
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact'});
});

app.listen(3000, () => {
    console.log("Server is running...");
});