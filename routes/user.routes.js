'use strict'

const express = require('express');
const UserController = require('./../controllers/user.controller');

const api = express.Router();
const md_auth = require('./../middlewares/auth');


api.get('/prueba-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:userId', md_auth.ensureAuth, UserController.updateUser);

module.exports = api;