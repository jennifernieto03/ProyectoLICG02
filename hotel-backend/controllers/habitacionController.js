const db = require('../config/db'); // Importa la conexión a la base de datos

// Obtiene todas las habitaciones
exports.getHabitaciones = (req, res) => {
  db.query('SELECT * FROM habitaciones', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    res.json(results); // Devuelve los resultados como JSON
  });
};