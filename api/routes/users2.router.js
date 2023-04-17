//llamar a express constructor
const express = require('express');
//llamar a la dependencia de faker
//const { faker } = require('@faker-js/faker');

//llamar el router
const router = express.Router();
//ejm: http://localhost:3000/api/users?limit=10&offset=100
router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    }
    );
  } else {
    res.send('No hay parametros');
  }
});

router.get('/auth', (req, res) => {
  res.send('Pagina de inicio de sesión');
});


module.exports = router;
