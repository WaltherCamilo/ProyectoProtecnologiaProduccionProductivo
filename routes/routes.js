const express = require('express');
const router = express.Router();

const proyectosController = require('../controllers/proyectos.controller');

router.get('/proyectos', proyectosController.obtenerProyectos);
router.post('/proyectos', proyectosController.crearProyecto);

module.exports = router;