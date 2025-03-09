import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { db } from './database/conection.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Ruta para probar el servidor (activo/inactivo)
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

// Ruta para probar la conexión a MySQL
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT NOW() AS now'); // Consulta la fecha actual en MySQL
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Ruta para registrar un usuario
app.post('/register', async (req, res) => {
    console.log("Datos recibidos:", JSON.stringify(req.body, null, 2));

    const { nombre, apellido, edad, email, telefono, contraseña } = req.body;

    // Validación básica
    if (!nombre || !apellido || !edad || !email || !contraseña) {
        return res.status(400).json({ success: false, message: "Todos los campos obligatorios deben completarse" });
    }

    try {
        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Insertar usuario en la base de datos
        const query = `INSERT INTO Usuario (nombre, apellido, edad, email, telefono, contraseña) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [nombre, apellido, edad, email, telefono || null, hashedPassword];

        await db.query(query, values);

        res.status(201).json({ success: true, message: "Usuario registrado exitosamente" });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: "El email ya está registrado" });
        }
        res.status(500).json({ success: false, message: "Error en el servidor", error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor funcionando en ' + PORT))