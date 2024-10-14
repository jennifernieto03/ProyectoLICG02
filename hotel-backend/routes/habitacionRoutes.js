const express = require('express');
const router = express.Router();
const habitacionController = require('../controllers/habitacionController');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todas las habitaciones (protegido)
router.get('/', authMiddleware.verificarToken, habitacionController.getHabitaciones);

module.exports = router;