const bcrypt = require('bcryptjs'); // Importa bcrypt para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para manejar tokens
const db = require('../config/db'); // Importa la conexión a la base de datos

// Registro de usuario
exports.registro = async (req, res) => {
  const { nombre, correo, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña
  
  // Verifica si el correo ya está registrado
  const userExists = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  if (userExists.length > 0) {
    return res.status(400).json({ error: 'Ya existe una cuenta con ese correo.' });
  }

  // Inserta un nuevo usuario en la base de datos
  await db.query('INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)', [nombre, correo, hashedPassword]);
  res.status(201).json({ message: 'Usuario registrado correctamente.' });
};

// Login de usuario
exports.login = async (req, res) => {
  const { nombre, password } = req.body;
  const user = await db.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
  
  // Verifica si el usuario existe y la contraseña es correcta
  if (user.length === 0 || !(await bcrypt.compare(password, user[0].password))) {
    return res.status(400).json({ error: 'Credenciales incorrectas.' });
  }
  
  const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET); // Genera un token JWT
  res.json({ token }); // Envía el token como respuesta
};

// Logout de usuario
exports.logout = async (req, res) => {
  const token = req.body.token;

  // Elimina el token de la base de datos
  try {
    await db.query('DELETE FROM usuarios WHERE token = ?', [token]);
    return res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return res.status(500).json({ message: 'Error al cerrar sesión' });
  }
};