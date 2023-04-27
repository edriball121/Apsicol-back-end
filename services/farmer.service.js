const dbcon = require('./../connection');
const conn = dbcon();
const bcrypt = require('bcrypt')

class farmerService {
  constructor() {
    this.farmer = [];
  }
  //Buscar granjeros
  async getFarmer() {
    const sql = 'SELECT * FROM granjero';
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
  async addFarmer(farmerData) {
    const {
      gra_cedula,
      gra_nombre,
      gra_apellido,
      gra_password,
      gra_telefono,
      gra_email,
      gra_direccion,
      gra_fecha_nacimiento,
      gra_fecha_creacion,
      gra_perfil_laboral,
    } = farmerData;
    // Generar un hash de la contraseña
  const passwordHash = await bcrypt.hash(gra_password, 10);
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO granjero (gra_cedula, gra_nombre, gra_apellido, gra_password, gra_telefono, gra_email, gra_direccion, gra_fecha_nacimiento, gra_fecha_creacion,gra_perfil_laboral) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      conn.query(
        sql,
        [
          gra_cedula,
          gra_nombre,
          gra_apellido,
          passwordHash,
          gra_telefono,
          gra_email,
          gra_direccion,
          gra_fecha_nacimiento,
          gra_fecha_creacion,
          gra_perfil_laboral,
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
  async editFarmer(cedula, farmerData) {
    const {
      gra_cedula,
      gra_nombre,
      gra_apellido,
      gra_password,
      gra_telefono,
      gra_email,
      gra_direccion,
      gra_fecha_nacimiento,
      gra_fecha_creacion,
      gra_perfil_laboral,
    } = farmerData;
     // Generar un hash de la contraseña
  const passwordHash = await bcrypt.hash(gra_password, 10);
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE granjero SET gra_cedula=?, gra_nombre=?, gra_apellido=?, gra_password=?, gra_telefono=?, gra_email=?, gra_direccion=?, gra_fecha_nacimiento=?, gra_fecha_creacion=?,gra_perfil_laboral=? WHERE gra_cedula=?';
      conn.query(
        sql,
        [
          gra_cedula,
          gra_nombre,
          gra_apellido,
          passwordHash,
          gra_telefono,
          gra_email,
          gra_direccion,
          gra_fecha_nacimiento,
          gra_fecha_creacion,
          gra_perfil_laboral,
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
  async deleteFarmer(cedula) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM granjero WHERE gra_cedula=?';
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
module.exports = farmerService;
