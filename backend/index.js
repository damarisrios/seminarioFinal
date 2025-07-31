import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { db } from './database/conection.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

// Test conexión a MySQL
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Registro de usuario — ahora devuelve usuario_id
app.post('/register', async (req, res) => {
  console.log("Datos recibidos:", JSON.stringify(req.body, null, 2));

  const { nombre, apellido, edad, email, telefono, contraseña } = req.body;

  if (!nombre || !apellido || !edad || !email || !contraseña) {
    return res.status(400).json({ success: false, message: "Todos los campos obligatorios deben completarse" });
  }

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const query = `
      INSERT INTO Usuario (nombre, apellido, edad, email, telefono, contraseña)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [nombre, apellido, edad, email, telefono || null, hashedPassword];

    const [result] = await db.query(query, values);

    // 👇 Acá devolvemos el usuario_id recién creado
    const usuario_id = result.insertId;

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      usuario_id
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: "El email ya está registrado" });
    }
    res.status(500).json({ success: false, message: "Error en el servidor", error: error.message });
  }
});

// Registro en tabla Paciente
app.post('/register-paciente', async (req, res) => {
  const { usuario_id, altura, peso, imc, rol } = req.body;

  if (!usuario_id || !altura || !peso || !imc) {
    return res.status(400).json({ success: false, message: "Faltan campos requeridos" });
  }

  try {
    const query = `
      INSERT INTO Paciente (usuario_id, altura, peso, imc, rol)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [usuario_id, altura, peso, imc, rol || 'paciente'];

    await db.query(query, values);

    res.status(201).json({ success: true, message: 'Paciente registrado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al registrar paciente', error: error.message });
  }
});

// Registro tabla nutricionista
app.post('/register-nutricionista', async (req, res) => {
  const { usuario_id, matricula, universidad, especialidad } = req.body;

  if (!usuario_id || !matricula) {
    return res.status(400).json({ success: false, message: "Faltan campos obligatorios" });
  }

  try {
    const query = `
      INSERT INTO Nutricionista (usuario_id, matricula, universidad, especialidad)
      VALUES (?, ?, ?, ?)
    `;
    const values = [usuario_id, matricula, universidad || null, especialidad || null];

    await db.query(query, values);

    res.status(201).json({ success: true, message: 'Nutricionista registrado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al registrar nutricionista', error: error.message });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ success: false, message: "Todos los campos obligatorios deben completarse" });
  }

  try {
    const [rows] = await db.query('SELECT * FROM Usuario WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    const usuarioId = user.usuario_id;

    // Consultar si el usuario es nutricionista (NO OLVIDAR AGREGAR UT)
    const [nutriRows] = await db.query('SELECT * FROM Nutricionista WHERE usuario_id = ?', [usuarioId]);
    const [pacienteRows] = await db.query('SELECT * FROM Paciente WHERE usuario_id = ?', [usuarioId]);

    let rol = null;
    if (nutriRows.length > 0) rol = 'nutricionista';
    else if (pacienteRows.length > 0) rol = 'paciente';

    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      userId: usuarioId,
      rol: rol
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
});


// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor funcionando en ' + PORT));
