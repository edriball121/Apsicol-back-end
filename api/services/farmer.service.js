//llamar a la BBDD
const dbcon = require('./../connection');
//crear la app de express llamando al constructor
const conn = dbcon();
class farmerService {
  //Constructor
  constructor() {
    this.farmer = [];
    this.getFarmer();
  }
  async getFarmer(err, res) {
    const sql = 'SELECT * FROM producto';
    conn.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).send('No se encontraron datos');
      }
    });
  }
}
module.exports = farmerService;
