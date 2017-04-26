'use strict'

const express = require('express');
const SongController = require('./../controllers/song.controller');
const api = express.Router();
const md_auth = require('./../middlewares/auth');

const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/songs'});

api.post('/song', md_auth.ensureAuth, SongController.saveSong);
api.get('/song/:songId', md_auth.ensureAuth, SongController.getSong);
api.get('/songs/:albumId?', md_auth.ensureAuth, SongController.getSongs);
api.put('/song/:songId', md_auth.ensureAuth, SongController.updateSong);
api.delete('/song/:songId', md_auth.ensureAuth, SongController.deleteSong);

// ruta para subir camciones
// usamos multiparty para poder recoger las varialble que nos llega en Files
api.post('/upload-file/:songId', [md_auth.ensureAuth, md_upload], SongController.uploadFile);

//ruta que devulve la cancion
api.get('/get-file/:songFileId', SongController.getSongFile);

module.exports = api;