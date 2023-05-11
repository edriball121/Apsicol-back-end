const dbcon = require('./../connection');
const conn = dbcon();

class farmService {
  constructor() {
    this.farm = [];
  }
  //Buscar finca
  async getFarm() {
    const sql = 'SELECT * FROM finca';
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
  //Crear finca
  async addFarm(farmData) {
    const {
      fin_codigo,
      fin_nombre,
      fin_tamanno,
      fin_direccion,
      fin_foto,
      fin_productos,
      fin_telefono,
      fin_descripcion,
    } = farmData;
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO finca (fin_codigo, fin_nombre, fin_tamanno, fin_direccion, fin_foto, fin_productos, fin_telefono, fin_descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      conn.query(
        sql,
        [
          fin_codigo,
          fin_nombre,
          fin_tamanno,
          fin_direccion,
          fin_foto,
          fin_productos,
          fin_telefono,
          fin_descripcion,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }
  //Editar granjero
  async editFarm(id, farmData) {
    const {
      fin_codigo,
      fin_nombre,
      fin_tamanno,
      fin_direccion,
      fin_foto,
      fin_productos,
      fin_telefono,
      fin_descripcion,
    } = farmData;
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE finca SET fin_codigo=?, fin_nombre=?, fin_tamanno=?, fin_direccion=?, fin_foto=?, fin_productos=?, fin_telefono=?, fin_descripcion=? WHERE fin_codigo=?';
      conn.query(
        sql,
        [
          fin_codigo,
          fin_nombre,
          fin_tamanno,
          fin_direccion,
          fin_foto,
          fin_productos,
          fin_telefono,
          fin_descripcion,
          id,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }
  //Eliminar finca
  async deleteFarm(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM finca WHERE fin_codigo=?';
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
module.exports = farmService;
