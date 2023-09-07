const mysql = require('mysql2/promise');

const conncection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 33061,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.DB_NAME || 'shopperdb',
})

module.exports = conncection;