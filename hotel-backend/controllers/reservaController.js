const db = require('../config/db'); // Importa la conexión a la base de datos

// Reservar habitación
exports.reservarHabitacion = async (req, res) => {
  const { habitacionId, fechaInicio, fechaFin } = req.body; // Extrae datos del cuerpo de la solicitud
  // Verifica la disponibilidad de la habitación
  const disponibilidad = await verificarDisponibilidad(habitacionId, fechaInicio, fechaFin);
  
  if (disponibilidad) {
    const usuario = await obtenerUsuario(req)

    // Inserta la reserva si está disponible
    await db.promise().query('INSERT INTO reservaciones (id_habitacion, id_usuario, fecha_entrada, fecha_salida) VALUES (?, ?, ?, ?)', 
    [habitacionId, usuario, fechaInicio, fechaFin]);
    
    res.json({ exito: true });

    // Actualiza el estado de la habitación
  db.promise().query(
  'UPDATE habitaciones SET estado = ? WHERE id_habitacion = ?',
  ["Reservada", habitacionId], // Combina ambos parámetros en un solo arreglo
  (err) => {
    if (err) {
      return res.status(500).send('Error al actualizar la habitación');
    }
    res.status(201).send('Reserva creada');
  }
);
  } else {
    res.json({ exito: false, mensaje: 'No disponible en esas fechas.' });
  }
};

// Función para verificar la disponibilidad de la habitación en las fechas solicitadas
async function verificarDisponibilidad(habitacionId, fechaInicio, fechaFin) {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);

  // Consulta la base de datos para ver si las fechas chocan
  const [reservas] = await db.promise().query(`
    SELECT * FROM reservaciones
    WHERE id_habitacion = ? 
    AND (
      (fecha_entrada <= ? AND fecha_salida >= ?) OR  -- Nueva reserva comienza dentro de otra
      (fecha_entrada <= ? AND fecha_salida >= ?) OR  -- Nueva reserva termina dentro de otra
      (fecha_entrada >= ? AND fecha_salida <= ?)     -- Nueva reserva cubre completamente otra reserva
    )
  `, [habitacionId, fin, inicio, inicio, fin, inicio, fin]);

  // Devuelve true si no hay conflictos de reservas
  return reservas.length === 0;
}

// Función para obtener usuario
async function obtenerUsuario(req) {
  // Obtener el token del encabezado 'Authorization'
  const token = req.headers['authorization'];

  // Verificar si el token existe
  if (!token) {
    throw new Error('Token no proporcionado');
  }

  // Realizar la consulta a la base de datos
  const [resultados] = await db.promise().query('SELECT id_usuario FROM usuarios WHERE token = ?', [token]);

  // Verificar si se encontró algún usuario
  if (resultados.length === 0) {
    throw new Error('Usuario no encontrado');
  }



  // Retornar el id del usuario
  return resultados[0].id_usuario; // Suponiendo que solo se espera un usuario
}
