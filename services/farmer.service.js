const dbcon = require('./../connection');
const conn = dbcon();
const bcrypt = require('bcrypt')

class farmerService {
  constructor() {
    this.farmer = [];
  }

  //login agricultor JWT
  async loginFarmer(farmerData) {
    const { gra_cedula, gra_password } = farmerData;
    const sql = 'SELECT * FROM granjero WHERE gra_cedula=?';
    return new Promise((resolve, reject) => {
      conn.query(sql, [gra_cedula], async (err, res) => {
        if (err) {
          reject(err);
        } else {
          if (res.length > 0) {
            const farmer = res[0];
            const passwordMatch = await bcrypt.compare(gra_password, farmer.gra_password);
            if (passwordMatch) {
              resolve(farmer);
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
      rol,
    } = farmerData;
    // Generar un hash de la contraseña
    const passwordHash = await bcrypt.hash(gra_password, 10);
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO granjero (gra_cedula, gra_nombre, gra_apellido, gra_password, gra_telefono, gra_email, gra_direccion, gra_fecha_nacimiento, gra_fecha_creacion,gra_perfil_laboral, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
          rol
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
      rol,
    } = farmerData;
    // Generar un hash de la contraseña
    const passwordHash = await bcrypt.hash(gra_password, 10);
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE granjero SET gra_cedula=?, gra_nombre=?, gra_apellido=?, gra_password=?, gra_telefono=?, gra_email=?, gra_direccion=?, gra_fecha_nacimiento=?, gra_fecha_creacion=?,gra_perfil_laboral=?, rol=? WHERE gra_cedula=?';
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
