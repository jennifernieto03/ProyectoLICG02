const express = require('express'); // Importa el framework Express
const cors = require('cors'); // Importa el middleware CORS
const db = require('./config/db'); // Importa la configuración de la base de datos
const authRoutes = require('./routes/authRoutes'); // Importa las rutas de autenticación
const habitacionRoutes = require('./routes/habitacionRoutes'); // Importa las rutas de habitaciones
const reservaRoutes = require('./routes/reservaRoutes'); // Importa las rutas de reservas
require('./config/env'); // Carga las variables de entorno

const app = express(); // Crea una instancia de la aplicación Express
app.use(cors()); // Habilita CORS en la aplicación
app.use(express.json()); // Permite que la aplicación entienda JSON

// Define las rutas de la API
app.use('/api/auth', authRoutes); // Ruta para autenticación
app.use('/api/habitaciones', habitacionRoutes); // Ruta para gestionar habitaciones
app.use('/api/reservas', reservaRoutes); // Ruta para gestionar reservas

const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});