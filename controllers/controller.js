const { sql, config } = require('../config/database');

exports.obtenerProyectos = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Proyectos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.crearProyecto = async (req, res) => {
    try {

        const { nombre, descripcion, tecnologia } = req.body;

        await sql.connect(config);

        await sql.query`
        INSERT INTO Proyectos (nombre, descripcion, tecnologia)
        VALUES (${nombre}, ${descripcion}, ${tecnologia})
        `;

        res.json({ mensaje: "Proyecto creado correctamente" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};