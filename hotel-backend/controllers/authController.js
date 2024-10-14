const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Registro de usuario
exports.registro = async (req, res) => {
  const { nombre, correo, contraseña} = req.body;
  try {
    // Verificar si el correo ya está registrado
    const [userExists] = await db.promise().query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (userExists.length > 0) {
      return res.status(400).json({ error: 'Correo ya registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Insertar nuevo usuario
    await db.promise().query('INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)', [nombre, correo, hashedPassword]);
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { nombre, contraseña } = req.body;
  try {
    const [user] = await db.promise().query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);

    if (user.length === 0) {
      return res.status(400).json({ error: 'Credenciales incorrectas. ' });
    }

    const validPassword = await bcrypt.compare(contraseña, user[0].contraseña);
    if (!validPassword) {
      return res.status(400).json({ error: 'Credenciales incorrectas.' });
    }

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await db.promise().query('UPDATE usuarios SET token = ? WHERE nombre = ?', [token, nombre]);
    res.json({ token });


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor'});
  }
};


// Logout de usuario
exports.logout = async (req, res) => {
  const token = req.body.token;

  // Elimina el token de la base de datos
  try {
    // Asegúrate de usar .promise() antes de realizar la consulta
    await db.promise().query('UPDATE usuarios SET token = NULL WHERE token = ?', [token]);
    return res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return res.status(500).json({ message: 'Error al cerrar sesión: ' + error });
  }
};
