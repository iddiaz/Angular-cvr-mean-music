'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// carga de rutas de aplicación
const user_routes = require('./routes/user.routes');
const artist_routes = require('./routes/artist.routes');
const album_routes = require('./routes/album.routes');
const song_routes = require('./routes/song.routes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// configuración de cabeceras http
app.use((req,res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With,Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();

});

// ruta de prueba
// app.get('/prueba', (req, res)=>{
//   res.status(200).send({message: 'Servidor funcionando'});
// });

// rutas base con middleware
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);


module.exports = app;