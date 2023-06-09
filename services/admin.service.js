const dbcon = require('./../connection');
const conn = dbcon();
const bcrypt = require('bcrypt');

class adminService {
  constructor() {
    this.admin = [];
  }
  //login admin JWT
  async loginAdmin(adminData) {
  const { adm_cedula, adm_password } = adminData;
  const sql = 'SELECT * FROM administrador WHERE adm_cedula=?';
  return new Promise((resolve, reject) => {
    conn.query(sql, [adm_cedula], async (err, res) => {
      if (err) {
        reject(err);
      } else {
        if (res.length > 0) {
          const admin = res[0];
          const passwordMatch = await bcrypt.compare(adm_password, admin.adm_password);
          if (passwordMatch) {
            resolve(admin);
          } else {
            reject('La contraseña no coincide');
          }
        } else {
          reject('No se encontraron datos');
        }
      }
    });
  });
}

  //Buscar administrador
  async getAdmin() {
    const sql = "SELECT *, DATE_FORMAT(adm_fecha_nacimiento, '%Y-%m-%d') AS adm_fecha_nacimiento, DATE_FORMAT(adm_fecha_creacion, '%Y-%m-%d') AS adm_fecha_creacion FROM administrador";
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
  //Crear admin
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
      rol,
    } = adminData;
    // Generar un hash de la contraseña
    const passwordHash = await bcrypt.hash(adm_password, 10);
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO administrador (adm_cedula, adm_nombre, adm_apellido, adm_password, adm_telefono, adm_email, adm_direccion, adm_fecha_nacimiento, adm_fecha_creacion, adm_rol, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
          rol,
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
  //Editar administrador
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
      rol,
    } = adminData;
    // Generar un hash de la contraseña
    const passwordHash = await bcrypt.hash(adm_password, 10);
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE administrador SET adm_cedula=?, adm_nombre=?, adm_apellido=?, adm_password=?, adm_telefono=?, adm_email=?, adm_direccion=?, adm_fecha_nacimiento=?, adm_fecha_creacion=?,adm_rol=?, rol=? WHERE adm_cedula=?';
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
          rol,
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
