'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('./../config');

exports.ensureAuth = function (req, res, next ) {
  if(!req.headers.authorization) {
    return res.status(403).send({message: 'No tienes autorización'});
  }

  const token = req.headers.authorization.replace(/['"]+/g, '');
  try {
    let payload = jwt.decode(token, config.SECRET_TOKEN );
    if(payload.exp <= moment().unix()){
      return res.status(401).send({message: 'El token ha expirado'});
    }
    req.user = payload;
    next();
  }
  catch(ex) {
    return res.status(404).send({message: 'El token no es válido'});
  }



}