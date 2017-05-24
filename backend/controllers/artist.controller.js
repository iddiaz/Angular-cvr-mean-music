'use strict'

const path   = require('path');
const fs     = require('fs');
const Artist = require('./../models/artist');
const Album  = require('./../models/album');
const Song   = require('./../models/song');
const mongoosePaginate = require('mongoose-pagination');

// obtiene un artista
function getArtist(req, res) {
  let artistId = req.params.artistId;

  Artist.findById(artistId, (err, artist )=>{
    if(err) res.status(500).send({message: `Error en la petición ${err}`});
    if(!artist) res.status(404).send({message: 'El artista no existe'});

    res.status(200).send({ artist });

  });
}

// obtiene todos los artistas y pagina
function getArtists(req, res ){
  let page = req.params.page || 1;
  let itemsPerPage = 8;

  Artist.find().sort('name').paginate(page, itemsPerPage, (err, artists, total) => {

    if (err) return res.status(500).send({ message: `Error en la petición: ${err}` });

    if (total === 0 || !artists) return res.status(404).send({ message: 'No hay artistas' });

    return res.status(200).send({
      totalItems: total,
      artists: artists
    });
  });

}

// guarda un artista en la bd
function saveArtist (req, res) {

  let artist = new Artist();
  let params = req.body;

  artist.name = params.name;
  artist.description = params.description;
  artist.image = null;

  artist.save( (err, artistStored )=>{
    if(err) res.status(500).send({message: `Error al guardar el artista ${err}`});
    if(!artistStored) res.status(404).send({message: 'El artista no ha sido guardado'});

    res.status(200).send({artist: artistStored});
  });
}

function updateArtist (req, res) {
  let artistId = req.params.artistId;
  let update = req.body;

  Artist.findByIdAndUpdate(artistId, update, {new:true}, (err, artistUpdated)=>{
    if(err)
      return res.status(500).send({message: `Error no se ha encontrado al artista ${err}`});

    if(!artistUpdated)
      return res.status(404).send({message: 'Error al guardar el artista '});

    return res.status(200).send({artist: artistUpdated});
  });
}

function deleteArtist (req, res) {
  let artistId = req.params.artistId;

  Artist.findByIdAndRemove( artistId, (err, artistRemoved)=> {
    if (err)
      return res.status(500).send({message: `Error al borrar el artista: ${err}`});

    if (!artistRemoved)
      return res.status(500).send({message: 'EL artista ya ha sido borrado'});

    // console.log(artistRemoved);
    // res.status(200).send({artistRemoved});

    // elimina los albums del artista removido.
    Album.find({artist: artistRemoved._id}).remove((err, albumRemoved )=>{
      if(err) return res.status(500).send({message: `Error al eliminar el album: ${err}`});
      if(!albumRemoved) return res.status(404).send({message: 'El album no ha sido eliminado'});

      // elimina las canciones del artista
      Song.find({album: albumRemoved._id}).remove((err, songRemoved)=>{
        if(err) return res.status(500).send({message: `Error al eliminar la canción: ${err}`});
        if(!songRemoved) return res.status(404).send({message: 'La canción no ha sido eliminada'});

        return res.status(200).send({artist: artistRemoved });
      });

    });
  });

}

function uploadImage(req, res) {
  let artistId = req.params.artistId;
  // let fileName = 'No hay nada subido';

  //para recoger archivos por la variable File de los formularios usamos connect-multiparty en el fichero de ruta para esta ruta en concreto y así logramos acceso a la variable File
  if(req.files) {
    let filePath = req.files.image.path;
    let fileExtension = path.extname(filePath);
    let fileName = path.basename(filePath);

    if(fileExtension === '.png' || fileExtension === '.jpg' || fileExtension === '.gif') {
      Artist.findByIdAndUpdate(artistId,{ image: fileName }, {new:true}, (err, artistUpdated) =>{
        if(err || !artistUpdated )
          return res.status(500).send({message: `Error al actualizar el archivo: ${err}`});

        return res.status(200).send({artist: artistUpdated});
      });
    }
    else {
      return res.status(200).send({message: 'la extension del archivo no es válida'});
    }

    console.log('req.files: ', req.files);
    console.log('file_path: ', filePath);
    console.log('file_extension: ', fileExtension);
    console.log('file_name: ', fileName);

  }
  else {
    return res.status(200).send({message: 'No has subido ninguna imagen'});
  }
}

// devuelve imagen
function getImageFile(req, res) {
  let imageFile = req.params.imageFile;

  let pathFileImg = `./uploads/artists/${imageFile}`;

  if(fs.existsSync(pathFileImg)) {
    return res.sendFile(path.resolve(pathFileImg));
  }
  else {
    return res.status(200).send({message: 'El archivo no existe'});
  }
}

module.exports = {
  getArtist,
  getArtists,
  saveArtist,
  updateArtist,
  deleteArtist,
  uploadImage,
  getImageFile
};