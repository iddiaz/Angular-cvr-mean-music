'use strict'

function pruebas(req, res)  {
  res.status(200).send({message:'El controlador de usuario responde correctamente'});
}

module.exports = {
  pruebas
};