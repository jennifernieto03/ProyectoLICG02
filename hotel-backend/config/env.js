require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

module.exports = {
  port: process.env.PORT || 3000, // Define el puerto
  jwtSecret: process.env.JWT_SECRET, // Clave secreta para firmar los tokens JWT
  dbHost: process.env.DB_HOST, // Host de la base de datos
  dbUser: process.env.DB_USER, // Usuario de la base de datos
  dbPassword: process.env.DB_PASSWORD, // Contraseña de la base de datos
  dbName: process.env.DB_NAME, // Nombre de la base de datos
};
