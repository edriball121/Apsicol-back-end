//importar a mysql
const mysql = require('mysql');
//crear la conexión a la Base de datos
module.exports = ()=>{
  return  mysql.createConnection({
    host: 'localhost',
    database: 'apsicol',
    user: 'root',
    password: '',
  });
}
