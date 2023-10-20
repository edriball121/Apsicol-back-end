const dbcon = require('./../connection');
const conn = dbcon();
const bcrypt = require('bcrypt');

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
            const passwordMatch = await bcrypt.compare(
              gra_password,
              farmer.gra_password
            );
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

  //Recuperar contraseña
  async recoveryPassword(farmerData) {
    const { gra_cedula, gra_email } = farmerData;
    const sql = 'SELECT * FROM granjero WHERE gra_cedula=? and gra_email=?';
    return new Promise((resolve, reject) => {
      conn.query(sql, [gra_cedula, gra_email], async (err, res) => {
        if (err) {
          reject(err);
        } else {
          if (res.length > 0) {
            // Genera una nueva contraseña y su hash
            const newPassword = this.generateRandomPassword(); // Debes implementar esta función
            const newPasswordHash = await bcrypt.hash(newPassword, 10);
        
            // Actualiza la contraseña en la base de datos
            const updateSql = 'UPDATE granjero SET gra_password=? WHERE gra_cedula=?';
            conn.query(updateSql, [newPasswordHash, gra_cedula], (updateErr, updateRes) => {
              if (updateErr) {
                reject(updateErr);
              } else {
                resolve({ farmer: res[0], newPassword }); // Devuelve la nueva contraseña
              }
            });
          } else {
            reject('usuario o email invalidos');
          }
        }
      });
    });
  }
//generar password
generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let newPassword = '';
  const passwordLength = 10;

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    newPassword += characters[randomIndex];
  }

  return newPassword;
}

  //Buscar granjeros
  async getFarmer() {
    const sql =
      "SELECT *, DATE_FORMAT(gra_fecha_nacimiento, '%Y-%m-%d') AS gra_fecha_nacimiento, DATE_FORMAT(gra_fecha_creacion, '%Y-%m-%d') AS gra_fecha_creacion  FROM granjero";
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
