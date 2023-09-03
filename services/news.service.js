const dbcon = require('./../connection');
const conn = dbcon();

class newsService {
  constructor() {
    this.news = [];
  }
  //Buscar noticias
  async getNews() {
    const sql = "SELECT *, DATE_FORMAT(not_fecha_creacion, '%Y-%m-%d') AS not_fecha_creacion FROM noticias";
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
  //obtener las ultimas 4 noticias
  async getNewsTop() {
    const sql =
      "SELECT *, DATE_FORMAT(not_fecha_creacion, '%Y-%m-%d') AS not_fecha_creacion FROM noticias ORDER BY not_fecha_creacion DESC LIMIT 4";
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
  //Crear noticia
  async addNews(newsData) {
    const {
      not_codigo,
      not_nombre,
      not_descripcion,
      not_foto,
      not_fecha_creacion,
      not_url,
      fk_not_adm_cedula,
      not_subtitulo,
    } = newsData;
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO noticias (not_codigo, not_nombre, not_descripcion, not_foto, not_fecha_creacion, not_url, FK_not_adm_cedula, not_subtitulo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      conn.query(
        sql,
        [
          not_codigo,
          not_nombre,
          not_descripcion,
          not_foto,
          not_fecha_creacion,
          not_url,
          fk_not_adm_cedula,
          not_subtitulo,
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
  //Editar noticia
  async editNews(id, newsData) {
    const {
      not_codigo,
      not_nombre,
      not_descripcion,
      not_foto,
      not_fecha_creacion,
      not_url,
      fk_not_adm_cedula,
      not_subtitulo,
    } = newsData;
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE noticias SET not_codigo=?, not_nombre=?, not_descripcion=?, not_foto=?, not_fecha_creacion=?, not_url=?, FK_not_adm_cedula=?, not_subtitulo=? WHERE not_codigo=?';
      conn.query(
        sql,
        [
          not_codigo,
          not_nombre,
          not_descripcion,
          not_foto,
          not_fecha_creacion,
          not_url,
          fk_not_adm_cedula,
          not_subtitulo,
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
  async deleteNews(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM noticias WHERE not_codigo=?';
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
module.exports = newsService;
