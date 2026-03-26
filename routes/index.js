const express = require("express");
const router = express.Router();
router.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  if (usuario === "admin" && password === "1234") {
    res.json({ mensaje: "Login exitoso" });
  } else {
    res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }
});

// 🔥 Ruta de prueba
router.get("/proyectos", (req, res) => {
  res.json([
    {
      nombre: "Proyecto 1",
      descripcion: "Sistema de portafolio",
      tecnologia: "Node.js"
    },
    {
      nombre: "Proyecto 2",
      descripcion: "API REST",
      tecnologia: "Express"
    }
  ]);
});

module.exports = router;