'use strict'

const path   = require('path');
const fs     = require('fs');
const Album  = require('./../models/album');
const Artist = require('./../models/artist');
const Song   = require('./../models/song');
const mongoosePaginate = require('mongoose-pagination');

// guarda un album
function saveAlbum (req, res) {
  let album = new Album();
  let params = req.body;
  album.title = params.title;
  album.description = params.description;
  album.year = params.year;
  album.image = null;
  album.artist = params.artist;

  album.save( (err, albumStored)=>{
    if(err) return res.status(500).send({message: `Error en el servidor: ${err}`});
    if(!albumStored) return res.status(404).send({message: 'no existe el album'});

    return res.status(200).send({ album: albumStored});
  })
}

// obtiene un album
function getAlbum(req, res) {
  let albumId = req.params.albumId;

  // el metodo pupulate, cargará los datos del objeto artista asociado al id guardado en el album.artist y exec ejecuta toda la instruccion
  Album.findById(albumId).populate({path: 'artist'}).exec((err, albumStored)=>{
    if(err) return res.status(500).send({message: 'error en la petición'});
    if(!albumStored) return res.status(404).send({message: 'No existe el album en la base de datos'});

    return res.status(200).send({albumStored});
  });
}
// obtiene todos los albums
function getAlbums(req, res) {
  // necesitamos listar todos los albums de un artista
  let artistId = req.params.artistId;
  let findsAlbums = [];

  if(!artistId) {
    //sacamos todos los albums ordenados por titulo
    findsAlbums = Album.find({}).sort('title');


  } else {
    //sacamos todos los albulms del artista concreto
    findsAlbums = Album.find({artist: artistId}).sort('year');

  }

  findsAlbums.populate({path: 'artist'}).exec((err, albumsStored )=>{
    return res.status(200).send({albumsStored});
  });
}

function updateAlbum (req, res) {
  let albumId = req.params.albumId;
  let update = req.body;

  Album.findByIdAndUpdate(albumId, update, (err, albumUpdated)=>{
    if(err) return res.status(500).send({message: `Error en el servidor: ${err}`});
    if(!albumUpdated) return res.status(404).send({message: 'El album no existe'});

    return res.status(200).send({album: albumUpdated});
  });
}

function deleteAlbum(req, res){
  let albumId = req.params.albumId;

  // elimina el album indicado.
  Album.findByIdAndRemove(albumId, (err, albumRemoved )=>{
    if(err) return res.status(500).send({message: `Error al eliminar el album: ${err}`});
    if(!albumRemoved) return res.status(404).send({message: 'No existe el album'});

    // elimina las canciones asociadas al album eliminado
    Song.find({album: albumRemoved._id}).remove((err, songStored)=>{
      if(err) return res.status(500).send({message: `Error al eliminar la canción: ${err}`});
      if(!songStored) return res.status(404).send({message: 'La canción no existe'});

      return res.status(200).send({album: albumRemoved });
    });

  });
}

function uploadImage(req, res) {
  let albumId = req.params.albumId;
  // let fileName = 'No hay nada subido';

  //para recoger archivos por la variable File de los formularios usamos connect-multiparty en el fichero de ruta para esta ruta en concreto y así logramos acceso a la variable File
  if(req.files) {
    let filePath = req.files.image.path;
    let fileExtension = path.extname(filePath);
    let fileName = path.basename(filePath);

    if(fileExtension === '.png' || fileExtension === '.jpg' || fileExtension === '.gif') {
      Album.findByIdAndUpdate(albumId,{ image: fileName }, (err, albumUpdated) =>{
        if(err || !albumUpdated )
          return res.status(500).send({message: `Error al actualizar el archivo: ${err}`});

        return res.status(200).send({album: albumUpdated});
      });
    }
    else {
      return res.status(200).send({message: 'la extension del archivo no es válida'});
    }
  }
  else {
    return res.status(200).send({message: 'No has subido ninguna imagen'});
  }
}

// devuelve imagen
function getImageFile(req, res) {
  let imageFile = req.params.imageFile;

  let pathFileImg = `./uploads/albums/${imageFile}`;

  if(fs.existsSync(pathFileImg)) {
    return res.sendFile(path.resolve(pathFileImg));
  }
  else {
    return res.status(200).send({message: 'El archivo no existe'});
  }
}


module.exports = {
  saveAlbum,
  getAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum,
  uploadImage,
  getImageFile
};