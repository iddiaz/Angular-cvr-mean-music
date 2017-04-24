'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// cargar rutas

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// configuración de cabeceras http

// rutas de prueba
app.get('/prueba', (req, res)=>{
  res.status(200).send({message: 'Servidor funcionando'})
})

module.exports = app;