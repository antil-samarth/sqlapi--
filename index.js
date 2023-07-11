const express = require('express');
const mysql = require('mysql');

require('dotenv').config();

const app = express();

// Create connection to MySQL database
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  url: process.env.MYSQLURL,
  port: process.env.MYSQLPORT,
});

// Connect to database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database with id ' + connection.threadId);
});

// GET request to retrieve data value which meets specified condition
app.get('/data', (req, res) => {
  /* const emp = req.header('condition'); */
  const emp = {
    empid: req.query.empid,
    empname: req.query.empname,
    organization: req.query.organization,
    username: req.query.username,
  }
  const sql = `SELECT * FROM mytable WHERE empid = ${emp.empid} AND empname = '${emp.empname}' AND organization = '${emp.organization}' AND username = '${emp.username}'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});