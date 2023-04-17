//llamar a express constructor
const express = require('express');
//llamar a la dependencia de faker
//const { faker } = require('@faker-js/faker');

//llamar el router
const router = express.Router();

router.get('/:catId/products/:proId', (req, res) => {
  const { catId, proId } = req.params;
  res.json({
    catId,
    proId
  });
});

module.exports = router;
