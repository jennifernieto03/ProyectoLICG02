const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const authMiddleware = require('../middleware/authMiddleware');

// Reservar habitación (protegido)
router.post('/', authMiddleware.verificarToken, reservaController.reservarHabitacion);

module.exports = router;