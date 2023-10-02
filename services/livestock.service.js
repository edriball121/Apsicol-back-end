const dbcon = require('./../connection');
const conn = dbcon();

class livestockService {
  constructor() {
    this.farming = [];
  }
  //Buscar productos pecuario
  async getLivestock() {
    const sql = "SELECT *, DATE_FORMAT(Ape_fecha_creacion, '%Y-%m-%d') AS Ape_fecha_creacion FROM pecuario";
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
  //Crear producto pecuario
  async addLivestock(livestockData) {
    const {
      Ape_codigo,
      Ape_nombre,
      Ape_tipo,
      Ape_fecha_creacion,
      Ape_Foto,
      Ape_Descripcion,
    } = livestockData;
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO pecuario (Ape_codigo, Ape_nombre, Ape_tipo, Ape_fecha_creacion, Ape_Foto, Ape_Descripcion) VALUES (?, ?, ?, ?, ?, ?)';
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
  async editLivestock(id, livestockData) {
    const {
      Ape_codigo,
      Ape_nombre,
      Ape_tipo,
      Ape_fecha_creacion,
      Ape_Foto,
      Ape_Descripcion,
    } = livestockData;
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE pecuario SET Ape_codigo=?, Ape_nombre=?, Ape_tipo=?, Ape_fecha_creacion=?, Ape_Foto=?, Ape_Descripcion=? WHERE Ape_codigo=?';
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
  async deleteLivestock(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM pecuario WHERE Ape_codigo=?';
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
module.exports = livestockService;
