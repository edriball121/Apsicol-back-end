const dbcon = require('./../connection');
const conn = dbcon();

class familyBasketService {
  constructor() {
    this.familyBasket = [];
  }
  //Buscar canasta familiar
  async getFamilyBasket() {
    const sql =
      "SELECT *, DATE_FORMAT(cta_fecha, '%Y-%m-%d') AS cta_fecha FROM canasta_familiar";
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
  //Crear canasta familiar
  async addFamilyBasket(familyBasketData) {
    const {
      cta_codigo,
      cta_nombre,
      cta_precio,
      cta_fecha,
      cta_ciudad,
      fk_cta_adm_cedula,
      fk_cta_ciu_codigo,
    } = familyBasketData;
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO canasta_familiar (cta_codigo, cta_nombre, cta_precio, cta_fecha, cta_ciudad, fk_cta_adm_cedula, fk_cta_ciu_codigo) VALUES (?, ?, ?, ?, ?, ?, ?)';
      conn.query(
        sql,
        [
          cta_codigo,
          cta_nombre,
          cta_precio,
          cta_fecha,
          cta_ciudad,
          fk_cta_adm_cedula,
          fk_cta_ciu_codigo,
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
  //Editar canasta familiar
  async editFamilyBasket(id, familyBasketData) {
    const {
      cta_codigo,
      cta_nombre,
      cta_precio,
      cta_fecha,
      cta_ciudad,
      fk_cta_adm_cedula,
      fk_cta_ciu_codigo,
    } = familyBasketData;
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE canasta_familiar SET cta_codigo=?, cta_nombre=?, cta_precio=?, cta_fecha=?, cta_ciudad=?, fk_cta_adm_cedula=?, fk_cta_ciu_codigo=? WHERE cta_codigo=?';
      conn.query(
        sql,
        [
          cta_codigo,
          cta_nombre,
          cta_precio,
          cta_fecha,
          cta_ciudad,
          fk_cta_adm_cedula,
          fk_cta_ciu_codigo,
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
  async deleteFamilyBasket(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM canasta_familiar WHERE cta_codigo=?';
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
module.exports = familyBasketService;
