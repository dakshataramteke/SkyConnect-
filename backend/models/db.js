const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', // or your host
    user: 'root',
    password: 'Dakshata@2023',
    database: 'sv_bulk'
});

connection.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});
// Close the connection
// db.end();

module.exports= connection;