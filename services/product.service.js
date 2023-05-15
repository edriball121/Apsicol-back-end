const dbcon = require('./../connection');
const conn = dbcon();

class productService {
  constructor() {
    this.product = [];
  }
  //Buscar producto
  async getProduct() {
    const sql = 'SELECT * FROM producto';
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
  //Crear producto
  async addProduct(productData) {
    const {
      pro_codigo,
      pro_nombre,
      pro_descripcion,
      pro_precio,
      pro_estado,
      pro_cantidad,
      pro_terminos_y_condiciones,
      pro_foto,
    } = productData;
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO producto (pro_codigo, pro_nombre, pro_descripcion, pro_precio, pro_estado, pro_cantidad, pro_terminos_y_condiciones, pro_foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      conn.query(
        sql,
        [
          pro_codigo,
          pro_nombre,
          pro_descripcion,
          pro_precio,
          pro_estado,
          pro_cantidad,
          pro_terminos_y_condiciones,
          pro_foto,
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
  //Editar producto
  async editProduct(id, productData) {
    const {
      pro_codigo,
      pro_nombre,
      pro_descripcion,
      pro_precio,
      pro_estado,
      pro_cantidad,
      pro_terminos_y_condiciones,
      pro_foto,
    } = productData;
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE producto SET pro_codigo=?, pro_nombre=?, pro_descripcion=?, pro_precio=?, pro_estado=?, pro_cantidad=?, pro_terminos_y_condiciones=?, pro_foto=? WHERE pro_codigo=?';
      conn.query(
        sql,
        [
          pro_codigo,
          pro_nombre,
          pro_descripcion,
          pro_precio,
          pro_estado,
          pro_cantidad,
          pro_terminos_y_condiciones,
          pro_foto,
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
  //Eliminar producto
  async deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM producto WHERE pro_codigo=?';
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
module.exports = productService;
