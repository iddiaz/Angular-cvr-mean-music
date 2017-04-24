'use strict'

const express = require('express');
const UserController = require('./../controllers/user.controller');

const api = express.Router();
const md_auth = require('./../middlewares/auth');

const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/users'});


api.get('/prueba-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:userId', md_auth.ensureAuth, UserController.updateUser);
// usamos el md_upload para poder recoger las varialbles que nos lleguen por files
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);

api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;