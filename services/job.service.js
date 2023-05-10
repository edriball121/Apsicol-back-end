const dbcon = require('./../connection');
const conn = dbcon();

class jobService {
  constructor() {
    this.job = [];
  }
  //Buscar trabajo
  async getJob() {
    const sql = 'SELECT * FROM empleo';
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
  //Crear trabajo
  async addJob(jobData) {
    const {
      emp_codigo,
      emp_nombre,
      emp_termnos_y_condiciones,
      emp_fecha_creacion,
      emp_descripcion,
    } = jobData;
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO empleo (emp_codigo, emp_nombre, emp_termnos_y_condiciones, emp_fecha_creacion, emp_descripcion) VALUES (?, ?, ?, ?, ?)';
      conn.query(
        sql,
        [
          emp_codigo,
          emp_nombre,
          emp_termnos_y_condiciones,
          emp_fecha_creacion,
          emp_descripcion,
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
  //Editar trabajo
  async editJob(id, jobData) {
    const {
      emp_codigo,
      emp_nombre,
      emp_termnos_y_condiciones,
      emp_fecha_creacion,
      emp_descripcion,
    } = jobData;
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE empleo SET emp_codigo=?, emp_nombre=?, emp_termnos_y_condiciones=?, emp_fecha_creacion=?, emp_descripcion=? WHERE emp_codigo=?';
      conn.query(
        sql,
        [
          emp_codigo,
          emp_nombre,
          emp_termnos_y_condiciones,
          emp_fecha_creacion,
          emp_descripcion,
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
  //Eliminar trabajo
  async deleteJob(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM empleo WHERE emp_codigo=?';
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
module.exports = jobService;
