const dbcon = require('../connection');
const conn = dbcon();

class servicesService {
  constructor() {
    this.services = [];
  }
  //Buscar servicios
  async getServices() {
    const sql = 'SELECT * FROM servicios';
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
  //Crear servicios
  async addServices(ServicesData) {
    const {
      ser_codigo,
      ser_nombre,
      ser_descripcion,
      ser_valor,
      ser_foto,
      fk_ser_emp_codigo,
    } = ServicesData;
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO servicios (ser_codigo, ser_nombre, ser_descripcion, ser_valor, ser_foto, fk_ser_emp_codigo) VALUES (?, ?, ?, ?, ?, ?)';
      conn.query(
        sql,
        [
          ser_codigo,
          ser_nombre,
          ser_descripcion,
          ser_valor,
          ser_foto,
          fk_ser_emp_codigo,
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
  //Editar servicios
  async editServices(id, servicesData) {
    const {
      ser_codigo,
      ser_nombre,
      ser_descripcion,
      ser_valor,
      ser_foto,
      fk_ser_emp_codigo,
    } = servicesData;
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE servicios SET ser_codigo=?, ser_nombre=?, ser_descripcion=?, ser_valor=?, ser_foto=?, fk_ser_emp_codigo=? WHERE ser_codigo=?';
      conn.query(
        sql,
        [
          ser_codigo,
          ser_nombre,
          ser_descripcion,
          ser_valor,
          ser_foto,
          fk_ser_emp_codigo,
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
  //Eliminar granjero
  async deleteServices(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM servicios WHERE ser_codigo=?';
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
module.exports = servicesService;
