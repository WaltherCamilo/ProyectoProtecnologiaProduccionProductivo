const express = require('express');
const sql = require('mssql');

const app = express();
app.use(express.json());

const config = {
    user: 'api_user',
    password: 'Colombia2026*',
    server: 'localhost',
    database: 'Informe',
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Endpoint para consultar proyectos
app.get('/api/proyectos', async (req, res) => {
    try {

        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Proyectos');

        res.json(result.recordset);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint para insertar proyectos
app.post('/api/proyectos', async (req, res) => {
    try {

        const { nombre, descripcion, tecnologia } = req.body;

        await sql.connect(config);

        await sql.query`
            INSERT INTO Proyectos (nombre, descripcion, tecnologia)
            VALUES (${nombre}, ${descripcion}, ${tecnologia})
        `;

        res.json({ mensaje: "Proyecto creado correctamente" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('🔥 Servidor corriendo en http://localhost:3000');
});