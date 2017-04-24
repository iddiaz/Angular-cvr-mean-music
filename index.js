'use strict'

const mongoose = require('mongoose');

//conexion a db
mongoose.connect('mongodb://localhost:27017/cmean2', (err,res)=>{
  if (err) console.log(`Error al conectar con la base de datos: ${err}`);

  console.log('Conexión a la base de datos establecida correctamente...');
});

