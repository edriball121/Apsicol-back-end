const dbcon = require('./../connection');
const conn = dbcon();
const bcrypt = require('bcrypt')

class adminService {
  constructor() {
    this.admin = [];
  }
  //Buscar administrador
  async getAdmin() {
    const sql = 'SELECT * FROM administrador';
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
  async addAdmin(adminData) {
    const {
      adm_cedula,
      adm_nombre,
      adm_apellido,
      adm_password,
      adm_telefono,
      adm_email,
      adm_direccion,
      adm_fecha_nacimiento,
      adm_fecha_creacion,
      adm_rol,
    } = adminData;
    // Generar un hash de la contraseña
  const passwordHash = await bcrypt.hash(adm_password, 10);
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO administrador (adm_cedula, adm_nombre, adm_apellido, adm_password, adm_telefono, adm_email, adm_direccion, adm_fecha_nacimiento, adm_fecha_creacion,adm_rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      conn.query(
        sql,
        [
          adm_cedula,
          adm_nombre,
          adm_apellido,
          passwordHash,
          adm_telefono,
          adm_email,
          adm_direccion,
          adm_fecha_nacimiento,
          adm_fecha_creacion,
          adm_rol,
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
  async editAdmin(cedula, adminData) {
    const {
      adm_cedula,
      adm_nombre,
      adm_apellido,
      adm_password,
      adm_telefono,
      adm_email,
      adm_direccion,
      adm_fecha_nacimiento,
      adm_fecha_creacion,
      adm_rol,
    } = adminData;
    // Generar un hash de la contraseña
  const passwordHash = await bcrypt.hash(adm_password, 10);
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE administrador SET adm_cedula=?, adm_nombre=?, adm_apellido=?, adm_password=?, adm_telefono=?, adm_email=?, adm_direccion=?, adm_fecha_nacimiento=?, adm_fecha_creacion=?,adm_rol=? WHERE adm_cedula=?';
      conn.query(
        sql,
        [
          adm_cedula,
          adm_nombre,
          adm_apellido,
          passwordHash,
          adm_telefono,
          adm_email,
          adm_direccion,
          adm_fecha_nacimiento,
          adm_fecha_creacion,
          adm_rol,
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
  async deleteAdmin(cedula) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM administrador WHERE adm_cedula=?';
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
module.exports = adminService;
