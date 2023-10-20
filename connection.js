//importar a mysql
const mysql = require('mysql');
//ENV
require('dotenv').config();
//crear la conexión a la Base de datos
module.exports = ()=>{
  return  mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATA_BASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  });
}
