const mysql = require('mysql2');
require('dotenv').config();

// Estas variables se acceden a través de 'process.env' y deben definirse en el archivo .env.
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Establece la conexión a la base de datos.
db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos: ', err);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Esto permite usar la conexión a la base de datos en otras partes del proyecto.
module.exports = db;