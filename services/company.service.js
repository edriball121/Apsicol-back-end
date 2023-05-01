const dbcon = require('./../connection');
const conn = dbcon();

class companyService {
  constructor() {
    this.company = [];
  }
  //Buscar compañia
  async getCompany() {
    const sql = 'SELECT * FROM empresa';
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
  //Crear empresa
  async addCompany(companyData) {
    const {
      emp_codigo,
      emp_nombre,
      emp_descripcion,
      emp_telefono,
      emp_foto,
      emp_subtitulo,
    } = companyData;
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO empresa (emp_codigo, emp_nombre, emp_descripcion, emp_telefono, emp_foto, emp_subtitulo) VALUES (?, ?, ?, ?, ?, ?)';
      conn.query(
        sql,
        [
          emp_codigo,
          emp_nombre,
          emp_descripcion,
          emp_telefono,
          emp_foto,
          emp_subtitulo,
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
  //Editar empresa
  async editCompany(id, companyData) {
    const {
      emp_codigo,
      emp_nombre,
      emp_descripcion,
      emp_telefono,
      emp_foto,
      emp_subtitulo,
    } = companyData;
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE empresa SET emp_codigo=?, emp_nombre=?, emp_descripcion=?, emp_telefono=?, emp_foto=?, emp_subtitulo=? WHERE emp_codigo=?';
      conn.query(
        sql,
        [
          emp_codigo,
          emp_nombre,
          emp_descripcion,
          emp_telefono,
          emp_foto,
          emp_subtitulo,
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
  //Eliminar empresa
  async deleteCompany(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM empresa WHERE emp_codigo=?';
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
module.exports = companyService;
