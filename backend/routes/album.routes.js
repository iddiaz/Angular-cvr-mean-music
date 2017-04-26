'use strict'

const express = require('express');
const AlbumController = require('./../controllers/album.controller');
const api = express.Router();
const md_auth = require('./../middlewares/auth');

const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/albums'});


api.post('/album', md_auth.ensureAuth, AlbumController.saveAlbum);
api.get('/album/:albumId', md_auth.ensureAuth, AlbumController.getAlbum);
api.get('/albums/:artistId?', md_auth.ensureAuth, AlbumController.getAlbums);
api.put('/album/:albumId', md_auth.ensureAuth, AlbumController.updateAlbum);
api.delete('/album/:albumId', md_auth.ensureAuth, AlbumController.deleteAlbum);

// ruta para subir imagen al album
// usamos multiparty para poder recoger las varialble que nos llega en el body de la peticion, en Files por form-data
api.post('/upload-image-album/:albumId', [md_auth.ensureAuth, md_upload], AlbumController.uploadImage);

//ruta que devulve la imagen
api.get('/get-image-album/:imageFile', AlbumController.getImageFile);


module.exports = api;