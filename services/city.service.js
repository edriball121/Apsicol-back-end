const dbcon = require('../connection');
const conn = dbcon();

class cityService {
  constructor() {
    this.city = [];
  }
  //Buscar ciudad
  async getCity() {
    const sql = 'SELECT * FROM ciudad';
    return new Promise((resolve, reject) => {
      conn.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          if (res.length > 0) {
            resolve(res);
          } else {
            reject('No se encontraron datos');
          }
        }
      });
    });
  }
  //Crear ciudad
  async addCity(cityData) {
    const { ciu_codigo, ciu_nombre, ciu_estado } = cityData;
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO ciudad (ciu_codigo, ciu_nombre, ciu_estado) VALUES (?, ?, ?)';
      conn.query(sql, [ciu_codigo, ciu_nombre, ciu_estado], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
  //Editar ciudad
  async editCity(id, cityData) {
    const { ciu_codigo, ciu_nombre, ciu_estado } = cityData;
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE ciudad SET ciu_codigo=?, ciu_nombre=?, ciu_estado=? WHERE ciu_codigo=?';
      conn.query(sql, [ciu_codigo, ciu_nombre, ciu_estado, id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
  //Eliminar ciudad
  async deleteCity(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM ciudad WHERE ciu_codigo=?';
      conn.query(sql, id, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}
module.exports = cityService;
