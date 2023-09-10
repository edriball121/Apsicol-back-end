const dbcon = require('./../connection');
const conn = dbcon();
const bcrypt = require('bcrypt')

class consultantService {
  constructor() {
    this.consultant = [];
  }
  //login consultor JWT
  async loginConsultant(consultantData) {
    const { con_cedula, con_password } = consultantData;
    const sql = 'SELECT * FROM consultor WHERE con_cedula=?';
    return new Promise((resolve, reject) => {
      conn.query(sql, [con_cedula], async (err, res) => {
        if (err) {
          reject(err);
        } else {
          if (res.length > 0) {
            const consultant = res[0];
            const passwordMatch = await bcrypt.compare(con_password, consultant.con_password);
            if (passwordMatch) {
              resolve(consultant);
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
  async getConsultant() {
    const sql = "SELECT *, DATE_FORMAT(con_fecha_nacimiento, '%Y-%m-%d') AS con_fecha_nacimiento, DATE_FORMAT(con_fecha_creacion, '%Y-%m-%d') AS con_fecha_creacion FROM consultor";
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
      rol,
    } = consultantData;
    // Generar un hash de la contraseña
    const passwordHash = await bcrypt.hash(con_password, 10);
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO consultor (con_cedula, con_nombre, con_apellido, con_password, con_telefono, con_email, con_direccion, con_fecha_nacimiento, con_fecha_creacion, con_profesion, con_annos_experiencia, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)';
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
      con_annos_experiencia,
      rol,
    } = consultantData;
    // Generar un hash de la contraseña
    const passwordHash = await bcrypt.hash(con_password, 10);
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE consultor SET con_cedula=?, con_nombre=?, con_apellido=?, con_password=?, con_telefono=?, con_email=?, con_direccion=?, con_fecha_nacimiento=?, con_fecha_creacion=?,con_profesion=?, con_annos_experiencia=?, rol=? WHERE con_cedula=?';
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
