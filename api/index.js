//llamar a express constructor
const express = require('express');
//llamar a el modulo routes
const routerAPI = require('./routes');
//llamar a cors
const cors = require('cors');
//llamar a la BBDD
const dbcon = require('./connection');

//llamar al modulo de middleware de error
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

//crear la app de express llamando al constructor
const app = express();
//instanciar el modulo de conexion a la BBDD
const conn = dbcon();
//configurar el puerto del servidor de express
const port = process.env.PORT || 3000;

//Agregar el middleware de express para manejo de jsons
app.use(express.json());

//lista blanca de dominions permitidos
const whiteList = ['http://localhost:8080', 'http://127.0.0.1:5500', 'http://127.0.0.1:3200'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
//agregar cors
app.use(cors(options));
//Agregar middleware de error
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//El servidor estara escuchando en el puerto indicado
app.listen(port, () => {
  console.log('Servidor online en la ruta ' + 'localhost:' + port)
});

//validar conexion a la BBDD
conn.connect(function(err){
  if(err){
    throw err;
  }else{
    console.log('Conexión exitosa');
  }
});

//routes
//req=request y res=response
app.get('/api', (req, res) => {
  res.send('Mi primer servidor en express');
});
app.get('/apiProducts', (req, res) => {
  const sql = 'SELECT * FROM producto';
  conn.query(sql, (err, results) => {
    if (err) { throw err; }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send('No se encontraron datos')
    }
  })
});

routerAPI(app);