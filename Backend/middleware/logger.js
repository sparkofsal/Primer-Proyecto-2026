// middleware/logger.js

//esta seccion me sirve para registrar en consola cada solicitud que vaya a entrar al servidor
function logger(req, res, next) {
  const fecha = new Date().toISOString();
  console.log(`[${fecha}] ${req.method} ${req.originalUrl}`);
  
  // next() permite que la petición continúe hacia la siguiente funcion middleware o ruta
  next();
}

module.exports = logger;
