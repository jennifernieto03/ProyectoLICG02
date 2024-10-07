const db = require('../config/db'); // Importa la conexión a la base de datos

// Obtiene todas las habitaciones
exports.getHabitaciones = async (req, res) => {
  const habitaciones = await db.query('SELECT * FROM habitaciones');
  res.json(habitaciones);
};