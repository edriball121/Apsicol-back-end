const dbcon = require('./../connection');
const conn = dbcon();

class queryMessageService {
  constructor() {
    this.queryMessage = [];
  }
  //Buscar mensaje consulta
  async getQueryMessage() {
    const sql = 'SELECT * FROM mensaje_consulta';
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
  //Crear mensaje consulta
  async addQueryMessage(queryMessageData) {
    const {
      mco_codigo,
      mco_fecha,
      mco_nombre,
      mco_descripcion,
      mco_tipo,
      fk_mco_con_cedula,
      fk_mco_gra_cedula,
      fk_mco_con_radicado,
    } = queryMessageData;
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO mensaje_consulta (mco_codigo, mco_fecha, mco_nombre, mco_descripcion, mco_tipo, fk_mco_con_cedula, fk_mco_gra_cedula, fk_mco_con_radicado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      conn.query(
        sql,
        [
          mco_codigo,
          mco_fecha,
          mco_nombre,
          mco_descripcion,
          mco_tipo,
          fk_mco_con_cedula,
          fk_mco_gra_cedula,
          fk_mco_con_radicado,
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
  //Editar mensaje consulta
  async editQueryMessage(id, queryMessageData) {
    const {
      mco_codigo,
      mco_fecha,
      mco_nombre,
      mco_descripcion,
      mco_tipo,
      fk_mco_con_cedula,
      fk_mco_gra_cedula,
      fk_mco_con_radicado,
    } = queryMessageData;
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE mensaje_consulta SET mco_codigo=?, mco_fecha=?, mco_nombre=?, mco_descripcion=?, mco_tipo=?, fk_mco_con_cedula=?, fk_mco_gra_cedula=?, fk_mco_con_radicado=? WHERE mco_codigo=?';
      conn.query(
        sql,
        [
          mco_codigo,
          mco_fecha,
          mco_nombre,
          mco_descripcion,
          mco_tipo,
          fk_mco_con_cedula,
          fk_mco_gra_cedula,
          fk_mco_con_radicado,
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
  //Eliminar mensaje consulta
  async deleteQueryMessage(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM mensaje_consulta WHERE mco_codigo=?';
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
module.exports = queryMessageService;
