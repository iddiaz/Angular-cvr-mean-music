'use strict'

const path   = require('path');
const fs     = require('fs');
const Song   = require('./../models/song');
// const Album  = require('./../models/album');
// const Artist = require('./../models/artist');
// const mongoosePaginate = require('mongoose-pagination');

function saveSong(req, res){
  let song = new Song();
  let params = req.body;
  song.number = params.number;
  song.name = params.name;
  song.duration = params.duration;
  song.file = null;
  song.album = params.album;

  song.save((err,songStored)=>{
    if(err) return res.status(500).send({message: `Error en el servidor ${err}`});
    if(!songStored) return res.status(404).send({message: 'La cancion no existe'});

    return res.status(200).send({song: songStored});

  });
}

function getSong(req, res) {
  let songId = req.params.songId;

  Song.findById(songId).populate({path: 'album'}).exec((err,song)=>{
    if(err) return res.status(500).send({message: `Error en la petición: ${err}`});
    if(!song) return res.status(404).send({message: 'El fichero solicitado no existe'});

    return res.status(200).send({ song });
  });
}

function getSongs(req, res) {
  let albumId = req.params.albumId;
  let findSongs = [];

  if(!albumId) {
    findSongs = Song.find({}).sort('number');
  }
  else {
    findSongs = Song.find({album: albumId }).sort('number');
  }

  findSongs.populate({
    path: 'album',
    populate: {
      path: 'artist',
      model:'Artist'
    }
  }).exec((err, songs)=>{
    if(err) return res.status(500).send({message: `Error en la petición: ${err}`});
    if(!songs) return res.status(404).send({message: 'No existen canciones'});

    return res.status(200).send({ songs });
  });
}

function updateSong(req, res){
  let songId = req.params.songId;
  let dataUpdate = req.body;

  Song.findByIdAndUpdate(songId, dataUpdate, (err, songUpdated)=>{
    if(err) return res.status(500).send({message: `Error en la petición: ${err}`});
    if(!songUpdated) return res.status(404).send({message: 'El archivo no existe'});

    return res.status(200).send({ song: songUpdated });
  });
}

function deleteSong(req, res){
  let songId = req.params.songId;

  Song.findOneAndRemove(songId, (err, songRemoved)=>{
    if(err) return res.status(500).send({message: `Error en la petición: ${err}`});
    if(!songRemoved) return res.status(404).send({message: 'El archivo ya no existe'});

    return res.status(200).send({ song: songRemoved });
  });
}

function uploadFile(req, res) {
  let songId = req.params.songId;
  // let fileName = 'No hay nada subido';

  //para recoger archivos por la variable File de los formularios usamos connect-multiparty en el fichero de ruta para esta ruta en concreto y así logramos acceso a la variable File
  if(req.files) {
    let filePath = req.files.file.path;
    let fileExtension = path.extname(filePath);
    let fileName = path.basename(filePath);

    if(fileExtension === '.mp3' || fileExtension === '.ogg' ) {
      Song.findByIdAndUpdate(songId,{ file: fileName }, (err, songUpdated) =>{
        if(err || !songUpdated )
          return res.status(500).send({message: `Error al subir el archivo: ${err}`});

        return res.status(200).send({song: songUpdated});
      });
    }
    else {
      return res.status(200).send({message: 'la extension del archivo no es válida'});
    }
  }
  else {
    return res.status(200).send({message: 'No has subido ningún archivo'});
  }
}

// devuelve imagen
function getSongFile(req, res) {
  let songFileId = req.params.songFileId;

  let pathSongFile = `./uploads/songs/${songFileId}`;

  if(fs.existsSync(pathSongFile)) {
    return res.sendFile(path.resolve(pathSongFile));
  }
  else {
    return res.status(200).send({message: 'El archivo no existe'});
  }
}

module.exports = {
  saveSong,
  getSong,
  getSongs,
  updateSong,
  deleteSong,
  uploadFile,
  getSongFile
};