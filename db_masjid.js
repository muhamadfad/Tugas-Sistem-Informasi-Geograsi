
// dbconfig.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_masjid',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
});

module.exports = connection;
