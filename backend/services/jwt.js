'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('./../config');

exports.createToken = function(user) {
  const payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };

  return jwt.encode(payload, config.SECRET_TOKEN );
};