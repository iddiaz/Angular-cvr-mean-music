# Proyecto MEAN2 fullStack

## API Rest install dependencies:

- express
- bcrypt-nodejs (encripta las contraseñas al guardarlas en la base de datos).
- body-parser ( parsea las peticiones que nos llegen por post etc, a formato json para poder trabajar con objetos destro del cóodigo, todos los datos que recibamos se convertiran a un objeto).
- connect-multiparty (para poder recibir ficheros con node, usando el protocolo http, manejando la variable file, y que los formularios puedan tener un multipart y puedan enviarle datos a la api para que se guarden esos ficheros en el servidor ).

- jwt-simple ( para autenticación con tokens ).

- moment ( para controlar fechas etc... ).

- mongoose ( orm para facilitar el trabajo con mongodb ).

- mongoose-pagination ( para hacer paginación en el proyecto ).

- nodemon ( permite recargar el servidor cada vez que hagamos un cambio en la api rest para no tener que hacerlo manual ).