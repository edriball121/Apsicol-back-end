const dbcon = require('./../connection');
const conn = dbcon();

class farmingService {
  constructor() {
    this.farming = [];
  }
  //Buscar productos agricolas
  async getFarming() {
    const sql = "SELECT *, DATE_FORMAT(Ape_fecha_creacion, '%Y-%m-%d') AS Ape_fecha_creacion FROM agricola";
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
  //Crear producto agricola
  async addFarming(farmingData) {
    const {
      Ape_codigo,
      Ape_nombre,
      Ape_tipo,
      Ape_fecha_creacion,
      Ape_Foto,
      Ape_Descripcion,
    } = farmingData;
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO agricola (Ape_codigo, Ape_nombre, Ape_tipo, Ape_fecha_creacion, Ape_Foto, Ape_Descripcion) VALUES (?, ?, ?, ?, ?, ?)';
      conn.query(
        sql,
        [
          Ape_codigo,
          Ape_nombre,
          Ape_tipo,
          Ape_fecha_creacion,
          Ape_Foto,
          Ape_Descripcion,
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
  //Editar producto agricola
  async editFarming(id, farmingData) {
    const {
      Ape_codigo,
      Ape_nombre,
      Ape_tipo,
      Ape_fecha_creacion,
      Ape_Foto,
      Ape_Descripcion,
    } = farmingData;
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE agricola SET Ape_codigo=?, Ape_nombre=?, Ape_tipo=?, Ape_fecha_creacion=?, Ape_Foto=?, Ape_Descripcion=? WHERE Ape_codigo=?';
      conn.query(
        sql,
        [
          Ape_codigo,
          Ape_nombre,
          Ape_tipo,
          Ape_fecha_creacion,
          Ape_Foto,
          Ape_Descripcion,
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
  //Eliminar producto agricola
  async deleteFarming(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM agricola WHERE Ape_codigo=?';
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
module.exports = farmingService;
