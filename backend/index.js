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

  const { nombre, apellido, nombre_usuario, edad, email, telefono, contraseña } = req.body;

  if (!nombre || !apellido || !nombre_usuario || !edad || !email || !contraseña) {
    return res.status(400).json({ success: false, message: "Todos los campos obligatorios deben completarse" });
  }

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const query = `
      INSERT INTO Usuario (nombre, apellido, nombre_usuario, edad, email, telefono, contraseña)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [nombre, apellido, nombre_usuario, edad, email, telefono || null, hashedPassword];

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
      username: user.nombre_usuario,
      rol: rol
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
});

// Obtener datos del usuario/paciente
app.get('/paciente/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Paciente WHERE usuario_id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
    }

    res.status(200).json({ success: true, paciente: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener paciente', error: error.message });
  }
});

// Modificar los datos del usuario/paciente
app.put('/paciente/:id', async (req, res) => {
  const { id } = req.params;
  const { altura, peso, imc, objetivo } = req.body;

  if (!altura || !peso || !imc) {
    return res.status(400).json({ success: false, message: "Faltan campos obligatorios" });
  }

  try {
    const query = `
      UPDATE Paciente
      SET altura = ?, peso = ?, imc = ?, objetivo = ?
      WHERE usuario_id = ?
    `;
    const values = [altura, peso, imc, objetivo || null, id];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
    }

    res.status(200).json({ success: true, message: 'Perfil actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar paciente', error: error.message });
  }
});

// Buscar usuario por nombre_usuario para modificar datos del paciente (nutri)
app.get('/usuario-by-username/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const [rows] = await db.query('SELECT usuario_id FROM Usuario WHERE nombre_usuario = ?', [username]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    res.json({ success: true, usuario_id: rows[0].usuario_id });
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});


// Editar perfil, contraseña y/o nombre de usuario
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { new_username, contrasena_actual, contrasena_nueva } = req.body;

  try {
    // Si quiere cambiar nombre de usuario
    if (new_username) {
      await db.query(
        'UPDATE Usuario SET nombre_usuario = ? WHERE usuario_id = ?',
        [new_username, id]
      );
    }

    // Si quiere cambiar contraseña
    if (contrasena_nueva) {
      if (!contrasena_actual) {
        return res.status(400).json({ success: false, message: 'Falta la contraseña actual' });
      }

      const [rows] = await db.query(
        'SELECT `contraseña` FROM Usuario WHERE usuario_id = ? LIMIT 1',
        [id]
      );
      if (!rows.length) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }

      const hashActual = rows[0]['contraseña'];
      const ok = await bcrypt.compare(contrasena_actual, hashActual);
      if (!ok) {
        return res.status(401).json({ success: false, message: 'La contraseña actual es incorrecta' });
      }

      if (contrasena_actual === contrasena_nueva) {
        return res.status(400).json({ success: false, message: 'La nueva contraseña no puede ser igual a la actual' });
      }

      const newHash = await bcrypt.hash(contrasena_nueva, 10);
      await db.query(
        'UPDATE Usuario SET `contraseña` = ? WHERE usuario_id = ?',
        [newHash, id]
      );
    }

    return res.json({ success: true, message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    return res.status(500).json({ success: false, message: 'Error del servidor' });
  }
});



// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor funcionando en ' + PORT));
