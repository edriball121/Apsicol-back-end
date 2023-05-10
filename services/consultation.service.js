const dbcon = require('./../connection');
const conn = dbcon();

class consultationService {
  constructor() {
    this.consultation = [];
  }
  //Buscar consulta
  async getConsultation() {
    const sql = 'SELECT * FROM consulta';
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
  //Buscar una consulta
  async getOneConsultation(radicado) {
    const sql = 'SELECT * FROM consulta WHERE con_radicado=?';
    return new Promise((resolve, reject) => {
      conn.query(sql, radicado, (err, res) => {
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
  //Crear consulta
  async addConsultation(consultationData) {
    const {
      con_radicado,
      con_nombre,
      con_tipo_consulta,
      con_descripcion,
      con_fecha,
      con_estado,
      con_calificacion,
      con_fecha_finalizacion,
      fk_con_gra_cedula,
    } = consultationData;
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO consulta (con_radicado, con_nombre, con_tipo_consulta, con_descripcion, con_fecha, con_estado, con_calificacion, con_fecha_finalizacion, fk_con_gra_cedula) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      conn.query(
        sql,
        [
          con_radicado,
          con_nombre,
          con_tipo_consulta,
          con_descripcion,
          con_fecha,
          con_estado,
          con_calificacion,
          con_fecha_finalizacion,
          fk_con_gra_cedula,
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
  //Editar consulta
  async editconsultation(radicado, consultationData) {
    const {
      con_radicado,
      con_nombre,
      con_tipo_consulta,
      con_descripcion,
      con_fecha,
      con_estado,
      con_calificacion,
      con_fecha_finalizacion,
      fk_con_gra_cedula,
    } = consultationData;
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE consulta SET con_radicado=?, con_nombre=?, con_tipo_consulta=?, con_descripcion=?, con_fecha=?, con_estado=?, con_calificacion=?, con_fecha_finalizacion=?, FK_con_gra_cedula=? WHERE con_radicado=?';
      conn.query(
        sql,
        [
          con_radicado,
          con_nombre,
          con_tipo_consulta,
          con_descripcion,
          con_fecha,
          con_estado,
          con_calificacion,
          con_fecha_finalizacion,
          fk_con_gra_cedula,
          radicado,
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
  //Eliminar consulta
  async deleteconsultation(radicado) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM consulta WHERE con_radicado=?';
      conn.query(sql, radicado, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}
module.exports = consultationService;
