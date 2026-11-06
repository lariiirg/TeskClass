
const mysql = require('mysql2/promise');
require('dotenv').config();

const conexao = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3307),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'deadline',
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
});

module.exports = conexao;
