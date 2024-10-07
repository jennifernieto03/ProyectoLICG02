const db = require('../config/db'); // Importa la conexión a la base de datos

// Reservar habitación
exports.reservarHabitacion = async (req, res) => {
  const { habitacionId, fechaInicio, fechaFin } = req.body; // Extrae datos del cuerpo de la solicitud

  // Verifica la disponibilidad de la habitación
  const disponibilidad = await verificarDisponibilidad(habitacionId, fechaInicio, fechaFin);
  
  if (disponibilidad) {
    // Inserta la reserva si está disponible
    await db.query('INSERT INTO reservaciones (id_habitacion, id_usuario, fecha_entrada, fecha_salida) VALUES (?, ?, ?, ?)', 
    [habitacionId, req.user.id, fechaInicio, fechaFin]);
    
    res.json({ exito: true });

    // Actualiza el estado de la habitación
    db.query('UPDATE habitaciones SET estado = "Reservada" WHERE id_habitacion = ?', [habitacionId], (err) => {
      if (err) {
        return res.status(500).send('Error al actualizar la habitación');
      }
      res.status(201).send('Reserva creada');
    });
  } else {
    res.json({ exito: false, mensaje: 'No disponible en esas fechas.' });
  }
};

// Función para verificar la disponibilidad de la habitación en las fechas solicitadas
async function verificarDisponibilidad(habitacionId, fechaInicio, fechaFin) {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);

  // Consulta la base de datos para ver si las fechas chocan
  const reservas = await db.query(`
    SELECT * FROM reservaciones
    WHERE id_habitacion = ? 
    AND (
      (fecha_entrada < ? AND fecha_salida > ?) OR
      (fecha_entrada < ? AND fecha_salida > ?)
    )
  `, [habitacionId, fin, fin, inicio, inicio]);

  // Devuelve true si no hay problema
  return reservas.length === 0;
}