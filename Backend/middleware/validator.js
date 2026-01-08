// middleware/validator.js

function validarCampos(obligatorios) { //esta linea me sirve para definir los campos obligatorios que se deben validar en las solicitudes entrantes
  return (req, res, next) => {
    const errores = [];

    obligatorios.forEach((campo) => { //esta linea me sirve para validar campos obligatorios en las solicitudes entrantes
      if (!req.body[campo]) {
        errores.push(`El campo '${campo}' es obligatorio`);
      }
    });

    if (errores.length > 0) { //esta linea me sirve para enviar una respuesta de error si faltan campos obligatorios
      return res.status(400).json({
        mensaje: "Error de validación",
        errores,
      });
    }

    next();
  };
}

module.exports = validarCampos;
