'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// carga de rutas de aplicación
const user_routes = require('./routes/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// configuración de cabeceras http

// ruta de prueba
// app.get('/prueba', (req, res)=>{
//   res.status(200).send({message: 'Servidor funcionando'});
// });

// rutas base
app.use('/api', user_routes);


module.exports = app;