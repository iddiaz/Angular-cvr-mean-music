'use strict'

const User = require('./../models/user');
const bcrypt = require('bcrypt-nodejs');

function pruebas(req, res)  {
  res.status(200).send({message:'El controlador de usuario responde correctamente'});
}

// metodo guardar usuario
function saveUser( req, res ){
  let user = new User();
  //guardamos los parametros que vienen por post en el body en una variable por comodidad
  let params = req.body;
  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.password = params.password;
  user.role = 'ROLE_ADMIN';
  user.image = 'null';

  if(user.password) {
    // console.log(params);
    // encriptacion del password
    bcrypt.hash(user.password, null, null, (err, hash)=>{
      user.password = hash;

      if(user.name != null && user.surname != null && user.email != null) {
        //guarda el usuario en bd
        user.save((err,userStored)=>{
          if(err)
            return res.status(500).send({message: `Error al guardar el usuario: ${err}`});

          // comprobando si lo ha guardado correctamente
          if(!userStored)
            return res.status(404).send({message: 'No se ha podido registrar el usuario en la base de datos'});

          //Si todo bien?
          return res.status(200).send({user: userStored });

        });
      }
      else {
        res.status(203).send({message: 'Rellena los campos obligatorios para registro de usuario'});
      }

    });
  }
  else {
    res.status(403).send({message: 'Introduce la contraseña'});
  }
}




module.exports = {
  pruebas,
  saveUser
};