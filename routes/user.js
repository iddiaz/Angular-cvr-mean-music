'use strict'

const express = require('express');
const UserController = require('./../controllers/userCtrl');

const api = express.Router();

api.get('/prueba-controlador', UserController.pruebas);

module.exports = api;