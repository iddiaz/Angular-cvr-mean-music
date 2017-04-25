'use strict'

const express = require('express');
const ArtistController = require('./../controllers/artist.controller');
const api = express.Router();
const md_auth = require('./../middlewares/auth');

const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/artists'});

api.get('/artist/:artistId', md_auth.ensureAuth, ArtistController.getArtist);
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists
);
api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);
api.put('/artist/:artistId', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:artistId', md_auth.ensureAuth, ArtistController.deleteArtist);

// ruta para subir imagenes
// usamos multiparty para poder recoger las varialble que nos llega en Files
api.post('/upload-image-artist/:artistId', [md_auth.ensureAuth, md_upload], ArtistController.uploadImage);

//ruta que devulve la imagen
api.get('/get-image-artist/:imageFile', ArtistController.getImageFile);

module.exports = api;