function validateToken(req, res, next) {
  // Obtén el token del encabezado de autorización
  const token = req.headers.authorization.substr(7);
  if (token) {
    try {
      // Verifica y decodifica el token
      const decoded = jwt.verify(token, 'admin');
      // Guarda los datos del usuario en el objeto de solicitud para su posterior uso
      req.usuario = decoded;

      // Pasa el usuario decodificado como argumento adicional en next()
      next(decoded);
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  } else {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
}

module.exports = validateToken;
