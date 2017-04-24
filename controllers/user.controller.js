'use strict'

const User = require('./../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('./../services/jwt');

function pruebas(req, res)  {
  res.status(200).send({message:'El controlador de usuario responde correctamente'});
}

// metodo guardar usuario NOTA: no se ha considerado aun si el usuario ya esta creado
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

// metodo de login de usuario
function loginUser(req, res) {
  let params = req.body;
  let email = params.email;
  let password = params.password;

  User.findOne({email: email.toLowerCase()}, (err, user) =>{
    if (err) return res.status(500).send({message: `Error en la petición: ${err}`});

    if(!user) return res.status(404).send({message: 'El usuario no existe en la base de datos (estas dando demasiadas pistas...mejor que pongas lo mismo el usuario no ha posido loguearse :-) )'});

    bcrypt.compare(password, user.password, (err, check)=>{
      if (err || !check) return res.status(403).send({message: 'El usuario no ha podido loguearse'});

      if(params.gethash){
        // devolver un token de jwt
        res.status(200).send({
          token: jwt.createToken(user)
        });
      }

      return res.status(200).send({user});
    });
  });

}

// metodo de actualizacion de usuario
function updateUser(req, res ) {
  let userId = req.params.userId;
  let update = req.body;

  User.findByIdAndUpdate(userId, update, (err, userUpdated)=>{
    if(err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`});

    if(!userUpdated) res.status(404).send({message: 'No se ha podido actualizar el usuario'});

    res.status(200).send({user: userUpdated});

  });
}

module.exports = {
  pruebas,
  saveUser,
  loginUser,
  updateUser
};