const dbcon = require('./../connection');
const conn = dbcon();
const bcrypt = require('bcrypt')

class consultantService {
  constructor() {
    this.consultant = [];
  }
  //Buscar granjeros
  async getConsultant() {
    const sql = 'SELECT * FROM consultor';
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
  //Crear granjero
  async addConsultant(consultantData) {
    const {
      con_cedula,
      con_nombre,
      con_apellido,
      con_password,
      con_telefono,
      con_email,
      con_direccion,
      con_fecha_nacimiento,
      con_fecha_creacion,
      con_profesion,
      con_annos_experiencia,
    } = consultantData;
    // Generar un hash de la contraseña
  const passwordHash = await bcrypt.hash(con_password, 10);
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO consultor (con_cedula, con_nombre, con_apellido, con_password, con_telefono, con_email, con_direccion, con_fecha_nacimiento, con_fecha_creacion, con_profesion, con_annos_experiencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
      conn.query(
        sql,
        [
          con_cedula,
          con_nombre,
          con_apellido,
          passwordHash,
          con_telefono,
          con_email,
          con_direccion,
          con_fecha_nacimiento,
          con_fecha_creacion,
          con_profesion,
          con_annos_experiencia,
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
  async editConsultant(cedula, consultantData) {
    const {
      con_cedula,
      con_nombre,
      con_apellido,
      con_password,
      con_telefono,
      con_email,
      con_direccion,
      con_fecha_nacimiento,
      con_fecha_creacion,
      con_profesion,
      con_annos_experiencia
    } = consultantData;
    // Generar un hash de la contraseña
  const passwordHash = await bcrypt.hash(con_password, 10);
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE consultor SET con_cedula=?, con_nombre=?, con_apellido=?, con_password=?, con_telefono=?, con_email=?, con_direccion=?, con_fecha_nacimiento=?, con_fecha_creacion=?,con_profesion=?, con_annos_experiencia=? WHERE con_cedula=?';
      conn.query(
        sql,
        [
          con_cedula,
          con_nombre,
          con_apellido,
          passwordHash,
          con_telefono,
          con_email,
          con_direccion,
          con_fecha_nacimiento,
          con_fecha_creacion,
          con_profesion,
          con_annos_experiencia,
          cedula,
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
  async deleteConsultant(cedula) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM consultor WHERE con_cedula=?';
      conn.query(sql, cedula, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}
module.exports = consultantService;
