'use strict'

const User = require('./../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('./../services/jwt');

// imports de nodejs
const path = require('path');
const fs = require('fs');

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
  user.role = params.role;
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
        return res.status(200).send({
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

// Actualiza la imagen de avatar de usuario
function uploadImage(req, res) {
  let userId = req.params.id;
  // let fileName = 'No se ha subido ningun archivo...';

  //connect multiparty permite comprobar las variable superglobal files de la cabecera
  if(req.files) {
    let filePath = req.files.image.path;
    let fileExtension = path.extname(filePath);
    let fileName = path.basename(filePath);

    if(fileExtension === '.png' || fileExtension === '.jpg' || fileExtension === '.gif') {
      User.findByIdAndUpdate(userId,{ image: fileName }, (err, userUpdated) =>{
        if(err || !userUpdated )
          return res.status(500).send({message: `Error al actualizar el archivo: ${err}`});

        res.status(200).send({image: fileName, user: userUpdated});
      });
    }
    else {
      res.status(200).send({message: 'la extension del archivo no es válida'});
    }

    console.log('req.files: ', req.files);
    console.log('file_path: ', filePath);
    console.log('file_extension: ', fileExtension);
    console.log('file_name: ', fileName);

  }
  else {
    res.status(200).send({message: 'No has subido ninguna imagen'});
  }
}

// devuelve imagen
function getImageFile(req, res) {
  let imageFile = req.params.imageFile;
  // console.log('el filename de la peticion es ',imageFile);
  let pathFileImg = `./uploads/users/${imageFile}`;
  // console.log('el path de la peticion es ', pathFileImg)

  //NOTA ESTO ESTA DEPRECADO YA POR LO QUE SEGUN QUE VERSIÓN DE NODEJS NO FUNCIONA
  // fs.exists(pathFileImg, function ( exists ) {
  //   if(exists){
  //   //si existe lo devuelve
  //     res.sendFile(path.resolve(pathFileImg));
  //   }

  //   res.status(200).send({message: 'El archivo no existe'});
  // //   console.log(`esto es ./uploads/users/${fileName}`);
  // });

  // mira si existe el fichero en el servidor y lo devuelve
  if(fs.existsSync(pathFileImg)) {
    res.sendFile(path.resolve(pathFileImg));
  }
  else {
    res.status(200).send({message: 'El archivo no existe'});
  }
}


module.exports = {
  pruebas,
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile
};