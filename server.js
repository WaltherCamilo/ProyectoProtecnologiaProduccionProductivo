const express = require("express");
const path = require("path");

const app = express();
app.post("/api/login", (req, res) => {
  const { usuario, password } = req.body;

  if (usuario === "admin" && password === "1234") {
    res.json({ mensaje: "Login exitoso" });
  } else {
    res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }
});

// Servir frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// API
app.get("/api/proyectos", (req, res) => {
  res.json([
    { nombre: "Proyecto 1", descripcion: "Demo", tecnologia: "Node.js" }
  ]);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});